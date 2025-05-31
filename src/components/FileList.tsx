import React from 'react';
import Image from 'next/image';

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
  if (!Array.isArray(files) || files.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Nenhum arquivo encontrado
      </div>
    );
  }

  const folders = files.filter(file => file.mimeType === 'application/vnd.google-apps.folder');
  const otherFiles = files.filter(file => file.mimeType !== 'application/vnd.google-apps.folder');
  const sortedFiles = [...folders, ...otherFiles];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {sortedFiles.map((file) => (
        <div
          key={file.id}
          className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div 
            className="relative h-40 bg-gray-100 dark:bg-gray-700 cursor-pointer"
            onClick={() => onFileClick(file)}
          >
            {file.thumbnailLink ? (
              <Image
                src={file.thumbnailLink}
                alt={file.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Image
                  src={getFileIcon(file.mimeType)}
                  alt={file.mimeType}
                  width={64}
                  height={64}
                  className="opacity-50"
                />
              </div>
            )}
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
  );
}; 