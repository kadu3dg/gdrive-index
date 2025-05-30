import React from 'react';
import { drive_v3 } from 'googleapis';

interface FileListProps {
  files: drive_v3.Schema$File[];
  onFileClick: (file: drive_v3.Schema$File) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
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