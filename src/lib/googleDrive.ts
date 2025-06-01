import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export class GoogleDriveService {
  private drive;

  constructor() {
    try {
      console.log('Iniciando GoogleDriveService...');
      
      const credentials = process.env.GOOGLE_DRIVE_CREDENTIALS
        ? JSON.parse(Buffer.from(process.env.GOOGLE_DRIVE_CREDENTIALS, 'base64').toString('utf-8'))
        : null;

      if (!credentials) {
        throw new Error('Missing GOOGLE_DRIVE_CREDENTIALS environment variable');
      }

      console.log('Credenciais decodificadas com sucesso');

      const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });

      console.log('Auth configurado com sucesso');

      this.drive = google.drive({ version: 'v3', auth });
      
      console.log('Cliente do Google Drive inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar GoogleDriveService:', error);
      throw error;
    }
  }

  async listFiles(folderId?: string) {
    try {
      console.log(`Listando arquivos${folderId ? ` da pasta ${folderId}` : ''}...`);
      
      const response = await this.drive.files.list({
        q: folderId
          ? `'${folderId}' in parents and trashed = false`
          : 'trashed = false',
        fields: 'files(id, name, mimeType, size, modifiedTime, webContentLink, thumbnailLink, embedLink)',
        orderBy: 'folder,name',
        pageSize: 1000,
      });

      console.log(`Arquivos listados com sucesso. Total: ${response.data.files?.length || 0}`);
      
      return response.data.files || [];
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      throw error;
    }
  }

  async getFileById(fileId: string) {
    try {
      console.log(`Obtendo arquivo ${fileId}...`);
      
      const response = await this.drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size, modifiedTime, webContentLink, thumbnailLink, embedLink',
      });

      console.log('Arquivo obtido com sucesso');
      
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter arquivo ${fileId}:`, error);
      throw error;
    }
  }
} 