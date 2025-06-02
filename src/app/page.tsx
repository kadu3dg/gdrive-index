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
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([]);
  const { navigateToFolder: navigateWithEffects, changePage } = useFileSystem();
  const { activeSpecialDate, isSpecialDay } = useSpecialDates();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = currentFolderId
          ? `/api/files?folderId=${currentFolderId}`
          : '/api/files';
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        const fileList = Array.isArray(data) ? data : [];
        // Se não estiver em uma pasta, mostrar apenas pastas
        const filteredList = currentFolderId 
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
  }, [currentFolderId]);

  const handleFileClick = (file: DriveFile) => {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      setCurrentFolderId(file.id);
      setBreadcrumb([...breadcrumb, { id: file.id, name: file.name }]);
    } else if (file.webContentLink) {
      window.open(file.webContentLink, '_blank');
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumb = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newBreadcrumb);
    setCurrentFolderId(index === -1 ? null : newBreadcrumb[newBreadcrumb.length - 1].id);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {renderSpecialBanner()}
      
      {/* Breadcrumb navigation */}
      <nav className="flex items-center space-x-2 mb-4 text-sm">
        <button
          onClick={() => handleBreadcrumbClick(-1)}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Início
        </button>
        {breadcrumb.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {item.name}
            </button>
          </div>
        ))}
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : error ? (
        <GallifreyanError message={error} />
      ) : (
        <FileList
          folderId={currentFolderId}
          files={files}
          onFileClick={handleFileClick}
        />
      )}
    </div>
  );
} 