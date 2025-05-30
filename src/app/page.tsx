'use client';

import React, { useEffect, useState } from 'react';
import { drive_v3 } from 'googleapis';
import { FileList } from '@/components/FileList';
import { GoogleDriveService } from '@/lib/googleDrive';

export default function Home() {
  const [files, setFiles] = useState<drive_v3.Schema$File[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState<string | undefined>();

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
    if (file.mimeType === 'application/vnd.google-apps.folder' && file.id) {
      setCurrentFolder(file.id);
    } else {
      try {
        const driveService = new GoogleDriveService();
        const fileDetails = await driveService.getFileById(file.id!);
        if (fileDetails.webContentLink) {
          window.open(fileDetails.webContentLink, '_blank');
        }
      } catch (error) {
        console.error('Error opening file:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Google Drive Index
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <>
          {currentFolder && (
            <button
              onClick={() => setCurrentFolder(undefined)}
              className="mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Voltar
            </button>
          )}
          <FileList files={files} onFileClick={handleFileClick} />
        </>
      )}
    </div>
  );
} 