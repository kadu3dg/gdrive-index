'use client';

import { useEffect, useState } from 'react';
import { drive_v3 } from 'googleapis';
import { FileList } from '@/components/FileList';
import { GoogleDriveService } from '@/lib/googleDrive';

export default function Home() {
  const [files, setFiles] = useState<drive_v3.Schema$File[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const driveService = new GoogleDriveService();
        const fileList = await driveService.listFiles(currentFolder);
        setFiles(fileList);
      } catch (error) {
        console.error('Error loading files:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [currentFolder]);

  const handleFileClick = async (file: drive_v3.Schema$File) => {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      setCurrentFolder(file.id);
    } else {
      // Handle file download or preview
      try {
        const driveService = new GoogleDriveService();
        const fileDetails = await driveService.getFile(file.id!);
        if (fileDetails.webContentLink) {
          window.open(fileDetails.webContentLink, '_blank');
        }
      } catch (error) {
        console.error('Error handling file click:', error);
      }
    }
  };

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Google Drive Index</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <FileList files={files} onFileClick={handleFileClick} />
      )}
    </main>
  );
} 