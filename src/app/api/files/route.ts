export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';

export async function GET(request: Request) {
  try {
    console.log('Verificando credenciais...');
    
    if (!process.env.GOOGLE_DRIVE_CREDENTIALS) {
      console.error('Credenciais do Google Drive não configuradas');
      return NextResponse.json(
        { error: 'Google Drive credentials not configured' },
        { status: 500 }
      );
    }

    console.log('Obtendo parâmetros da URL...');
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');
    console.log('FolderId:', folderId);

    console.log('Inicializando serviço do Google Drive...');
    const driveService = new GoogleDriveService();

    console.log('Listando arquivos...');
    const files = await driveService.listFiles(folderId || undefined);
    console.log('Arquivos listados com sucesso');

    return NextResponse.json(Array.isArray(files) ? files : []);
  } catch (error) {
    console.error('Erro detalhado na rota de listagem:', error);
    
    // Extrair mensagem de erro mais detalhada
    const errorMessage = error instanceof Error 
      ? error.message
      : 'Erro desconhecido ao listar arquivos';
      
    const errorDetails = error instanceof Error && error.stack
      ? error.stack
      : 'Stack trace não disponível';

    return NextResponse.json(
      { 
        error: 'Failed to list files',
        details: errorMessage,
        stack: errorDetails
      },
      { status: 500 }
    );
  }
} 