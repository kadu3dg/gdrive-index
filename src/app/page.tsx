'use client';

import React, { useEffect, useState } from 'react';
import { FileList } from '@/components/FileList';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webContentLink?: string;
  thumbnailLink?: string;
}

export default function Home() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | undefined>();
  const [folderPath, setFolderPath] = useState<{id: string; name: string}[]>([]);

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
        
        const fileList = Array.isArray(data) ? data : [];
        // Se não estiver em uma pasta, mostrar apenas pastas
        const filteredList = currentFolder 
          ? fileList 
          : fileList.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
        setFiles(filteredList);
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
      setFolderPath(prev => [...prev, { id: file.id, name: file.name }]);
    } else if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleNavigateToFolder = (folderId: string | undefined, index: number) => {
    setCurrentFolder(folderId);
    setFolderPath(prev => prev.slice(0, index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!currentFolder && (
        <div className="my-8">
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      )}
      
      <SearchResults />

      {/* Breadcrumb navigation */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button
              onClick={() => handleNavigateToFolder(undefined, 0)}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              Início
            </button>
          </li>
          {folderPath.map((folder, index) => (
            <li key={folder.id}>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <button
                  onClick={() => handleNavigateToFolder(folder.id, index + 1)}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {folder.name}
                </button>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : (
        <FileList files={files} onFileClick={handleFileClick} />
      )}
    </div>
  );
} 