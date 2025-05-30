'use client';

import React, { useEffect, useState } from 'react';
import { FileList } from '@/components/FileList';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webContentLink?: string;
}

export default function Home() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | undefined>();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = currentFolder
          ? `/api/files?folderId=${currentFolder}`
          : '/api/files';
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        // Garantir que data é um array
        const fileList = Array.isArray(data) ? data : [];
        setFiles(fileList);
      } catch (error) {
        console.error('Error loading files:', error);
        setError(error instanceof Error ? error.message : 'Erro ao carregar arquivos');
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [currentFolder]);

  const handleFileClick = async (file: DriveFile) => {
    if (file.mimeType === 'application/vnd.google-apps.folder' && file.id) {
      setCurrentFolder(file.id);
    } else {
      try {
        const response = await fetch(`/api/files/${file.id}`);
        const fileDetails = await response.json();
        
        if (fileDetails.error) {
          throw new Error(fileDetails.error);
        }
        
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
      ) : error ? (
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
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