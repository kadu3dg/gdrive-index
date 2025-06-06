'use client';

import React, { useEffect, useState } from 'react';
import { FileList } from '@/components/FileList';
import { useFileSystem } from '@/hooks/useFileSystem';
import { GallifreyanError } from '@/components/GallifreyanError';
import { useSpecialDates } from '@/hooks/useSpecialDates';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { navigateToFolder: navigateWithEffects, changePage } = useFileSystem();
  const { activeSpecialDate, isSpecialDay } = useSpecialDates();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = currentFolder
          ? `/api/files/${currentFolder}`
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
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      const slug = generateSlug(file.name);
      await navigateWithEffects(slug);
      setCurrentFolder(slug);
      setFolderPath(prev => [...prev, { id: slug, name: file.name }]);
    } else if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleNavigateToFolder = async (folderId: string | undefined, index: number) => {
    if (index === folderPath.length) return;
    
    const cleanId = folderId ? folderId.replace(/:\d+$/, '') : undefined;
    await changePage(cleanId || '/');
    setCurrentFolder(cleanId);
    setFolderPath(prev => prev.slice(0, index));
  };

  // Renderizar banner de data especial
  const renderSpecialBanner = () => {
    if (!activeSpecialDate) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-blue-600 text-white p-4 mb-4 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{activeSpecialDate.title}</h3>
              <p className="text-blue-100">{activeSpecialDate.description}</p>
            </div>
            {activeSpecialDate.type === 'anniversary' && (
              <div className="text-4xl">🎂</div>
            )}
            {activeSpecialDate.type === 'regeneration' && (
              <div className="text-4xl">✨</div>
            )}
            {activeSpecialDate.type === 'special' && (
              <div className="text-4xl">🎉</div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Adicionar função para gerar slug a partir do nome do arquivo
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {renderSpecialBanner()}
      
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
        <GallifreyanError message={error} />
      ) : (
        <FileList files={files} onFileClick={handleFileClick} />
      )}
    </div>
  );
} 