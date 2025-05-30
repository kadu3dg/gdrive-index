import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export class GoogleDriveService {
  private drive;

  constructor() {
    const credentials = JSON.parse(
      Buffer.from(process.env.GD_SERVICE_B64 || '', 'base64').toString()
    );

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async listFiles(folderId?: string) {
    try {
      const response = await this.drive.files.list({
        q: folderId ? `'${folderId}' in parents` : 'root in parents',
        fields: 'files(id, name, mimeType, size, modifiedTime)',
      });

      return response.data.files || [];
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async getFile(fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size, modifiedTime, webContentLink',
      });

      return response.data;
    } catch (error) {
      console.error('Error getting file:', error);
      throw error;
    }
  }
} 