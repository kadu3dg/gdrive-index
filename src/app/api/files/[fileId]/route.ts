import { NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  if (!process.env.GOOGLE_DRIVE_CREDENTIALS) {
    return NextResponse.json(
      { error: 'Google Drive credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const driveService = new GoogleDriveService();
    const file = await driveService.getFileById(params.fileId);

    return NextResponse.json(file);
  } catch (error) {
    console.error('Error getting file:', error);
    return NextResponse.json(
      { error: 'Failed to get file' },
      { status: 500 }
    );
  }
} 