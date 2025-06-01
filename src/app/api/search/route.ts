import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { decrypt } from '@/utils/encryption';

const getGoogleDriveClient = () => {
  const credentials = JSON.parse(
    decrypt(process.env.GOOGLE_DRIVE_CREDENTIALS || '')
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const drive = getGoogleDriveClient();
    
    const response = await drive.files.list({
      q: `name contains '${query}' and trashed = false`,
      fields: 'files(id, name, mimeType, modifiedTime, size, webContentLink, thumbnailLink)',
      orderBy: 'modifiedTime desc',
      pageSize: 30,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });

    const files = response.data.files || [];
    
    // Adiciona webContentLink para arquivos que não têm
    const filesWithLinks = await Promise.all(
      files.map(async (file) => {
        if (!file.webContentLink && file.mimeType !== 'application/vnd.google-apps.folder') {
          try {
            const fileData = await drive.files.get({
              fileId: file.id!,
              fields: 'webContentLink',
              supportsAllDrives: true
            });
            if (fileData.data.webContentLink) {
              return { ...file, webContentLink: fileData.data.webContentLink };
            }
          } catch (error) {
            console.error(`Error getting link for file ${file.id}:`, error);
          }
        }
        return file;
      })
    );

    return NextResponse.json(filesWithLinks);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search files' },
      { status: 500 }
    );
  }
} 