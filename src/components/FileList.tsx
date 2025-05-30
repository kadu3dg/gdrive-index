import React from 'react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webContentLink?: string;
}

interface FileListProps {
  files: DriveFile[];
  onFileClick: (file: DriveFile) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  if (!Array.isArray(files) || files.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Nenhum arquivo encontrado
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => onFileClick(file)}
        >
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {file.name}
            </h3>
            {file.mimeType && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file.mimeType}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 