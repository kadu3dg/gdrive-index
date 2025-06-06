import { NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';

export async function GET(request: Request, { params }: { params: { folderId: string } }) {
  if (!process.env.GOOGLE_DRIVE_CREDENTIALS) {
    return NextResponse.json(
      { error: 'Google Drive credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const driveService = new GoogleDriveService();
    const files = await driveService.listFiles(params.folderId);

    return NextResponse.json(Array.isArray(files) ? files : []);
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
} 