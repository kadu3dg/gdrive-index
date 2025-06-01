import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export class GoogleDriveService {
  private drive;

  constructor() {
    const credentials = process.env.GOOGLE_DRIVE_CREDENTIALS
      ? JSON.parse(Buffer.from(process.env.GOOGLE_DRIVE_CREDENTIALS, 'base64').toString('utf-8'))
      : null;

    if (!credentials) {
      throw new Error('Missing GOOGLE_DRIVE_CREDENTIALS environment variable');
    }

    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async listFiles(folderId?: string) {
    const response = await this.drive.files.list({
      q: folderId
        ? `'${folderId}' in parents and trashed = false`
        : 'trashed = false',
      fields: 'files(id, name, mimeType, size, modifiedTime, webContentLink, thumbnailLink)',
      orderBy: 'folder,name',
      pageSize: 1000,
    });

    return response.data.files || [];
  }

  async getFileById(fileId: string) {
    const response = await this.drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, modifiedTime, webContentLink, thumbnailLink',
    });

    return response.data;
  }
} 