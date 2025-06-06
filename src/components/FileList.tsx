import React, { useState } from 'react';
import Image from 'next/image';
import { FilePreview } from './FilePreview';
import { SonicEffect } from './SonicEffect';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webContentLink?: string;
  thumbnailLink?: string;
}

interface FileListProps {
  files: DriveFile[];
  onFileClick: (file: DriveFile) => void;
}

const getFileIcon = (mimeType: string) => {
  if (mimeType === 'application/vnd.google-apps.folder') {
    return '/folder.svg';
  }
  if (mimeType.startsWith('image/')) {
    return '/image.svg';
  }
  if (mimeType.startsWith('video/')) {
    return '/video.svg';
  }
  if (mimeType.startsWith('audio/')) {
    return '/audio.svg';
  }
  if (mimeType.includes('document')) {
    return '/doc.svg';
  }
  if (mimeType.includes('spreadsheet')) {
    return '/sheet.svg';
  }
  if (mimeType.includes('presentation')) {
    return '/slide.svg';
  }
  return '/file.svg';
};

const formatFileSize = (bytes?: string) => {
  if (!bytes) return '';
  const size = parseInt(bytes);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  if (!Array.isArray(files) || files.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Nenhum arquivo encontrado
      </div>
    );
  }

  // Filtrar arquivos, removendo cover.jpg
  const filteredFiles = files.filter(file => file.name.toLowerCase() !== 'cover.jpg');

  const folders = filteredFiles
    .filter(file => file.mimeType === 'application/vnd.google-apps.folder')
    .sort((a, b) => {
      // Extrair o número da temporada (se existir)
      const getSeasonNumber = (name: string) => {
        const match = name.match(/(\d+)ª? Temporada/);
        return match ? parseInt(match[1]) : 0;
      };
      
      const seasonA = getSeasonNumber(a.name);
      const seasonB = getSeasonNumber(b.name);
      
      // Se ambos têm números de temporada, ordenar por número
      if (seasonA && seasonB) {
        return seasonA - seasonB;
      }
      
      // Caso contrário, ordenar alfabeticamente
      return a.name.localeCompare(b.name);
    });

  const otherFiles = filteredFiles
    .filter(file => file.mimeType !== 'application/vnd.google-apps.folder')
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedFiles = [...folders, ...otherFiles];

  const ViewToggle = () => (
    <div className="flex justify-end mb-4">
      <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center space-x-2 px-4 py-2 transition-colors ${
            viewMode === 'grid'
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Grade</span>
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center space-x-2 px-4 py-2 transition-colors ${
            viewMode === 'list'
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span>Lista</span>
        </button>
      </div>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div>
        <ViewToggle />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tamanho
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Modificado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedFiles.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer relative"
                  onClick={() => onFileClick(file)}
                  onMouseEnter={() => setHoveredFile(file.id)}
                  onMouseLeave={() => setHoveredFile(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={getFileIcon(file.mimeType)}
                        alt=""
                        className="h-5 w-5 mr-3"
                      />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {file.webContentLink && file.mimeType !== 'application/vnd.google-apps.folder' && (
                      <a
                        href={file.webContentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Download
                      </a>
                    )}
                  </td>
                  <SonicEffect isActive={hoveredFile === file.id} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ViewToggle />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {sortedFiles.map((file) => (
          <div
            key={file.id}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
            onMouseEnter={() => setHoveredFile(file.id)}
            onMouseLeave={() => setHoveredFile(null)}
          >
            <div 
              className={`relative h-40 bg-gray-100 dark:bg-gray-700 ${!file.mimeType.startsWith('video/') ? 'cursor-pointer' : ''}`}
              onClick={() => !file.mimeType.startsWith('video/') && onFileClick(file)}
            >
              <FilePreview file={file} />
              <SonicEffect isActive={hoveredFile === file.id} />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </span>
                {file.webContentLink && file.mimeType !== 'application/vnd.google-apps.folder' && (
                  <a
                    href={file.webContentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 