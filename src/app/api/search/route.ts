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
      fields: 'files(id, name, mimeType, modifiedTime, size)',
      orderBy: 'modifiedTime desc',
      pageSize: 30
    });

    return NextResponse.json(response.data.files || []);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search files' },
      { status: 500 }
    );
  }
} 