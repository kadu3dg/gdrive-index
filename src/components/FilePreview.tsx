'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SeasonCover } from './SeasonCover';

interface File {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
}

interface FolderCoverProps {
  folderId: string;
}

// Componente para buscar e exibir a capa da pasta
const FolderCover: React.FC<FolderCoverProps> = ({ folderId }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const response = await fetch(`/api/files?folderId=${folderId}`);
        const files = await response.json();
        const coverFile = files.find((file: File) => file.name.toLowerCase() === 'cover.jpg');
        if (coverFile?.thumbnailLink) {
          setCoverUrl(coverFile.thumbnailLink);
        }
      } catch (error) {
        console.error('Erro ao buscar capa:', error);
      }
    };

    fetchCover();
  }, [folderId]);

  if (!coverUrl) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div 
        className="w-full h-full rounded-lg"
        style={{ 
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

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

export const FilePreview: React.FC<{ file: File }> = ({ file }) => {
  const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
  const isImage = file.mimeType.startsWith('image/');
  const isVideo = file.mimeType.startsWith('video/');

  // Verificar se é uma pasta de temporada
  const seasonMatch = file.name.match(/(\d+)ª? Temporada/i);
  const isSeasonFolder = isFolder && seasonMatch;
  const seasonNumber = isSeasonFolder ? parseInt(seasonMatch[1]) : null;

  if (isSeasonFolder && seasonNumber) {
    return (
      <div className="relative w-full h-full">
        <FolderCover folderId={file.id.replace(/:\d+$/, '')} />
        <div className="absolute inset-0">
          <SeasonCover 
            seasonNumber={seasonNumber} 
            doctorNumber={0}
          />
        </div>
      </div>
    );
  }

  if (isFolder) {
    return (
      <div className="relative w-full h-full">
        <FolderCover folderId={file.id.replace(/:\d+$/, '')} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl font-bold mb-2 text-center px-4 text-white">{file.name}</div>
        </div>
      </div>
    );
  }

  if (isVideo) {
    const embedUrl = `https://drive.google.com/file/d/${file.id.replace(/:\d+$/, '')}/preview`;
    return (
      <div className="relative w-full h-full bg-black">
        <iframe
          src={embedUrl}
          allow="autoplay"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  if (isImage && file.thumbnailLink) {
    return (
      <Image
        src={file.thumbnailLink}
        alt={file.name}
        fill
        className="object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/file.svg"
        alt={file.name}
        width={64}
        height={64}
        className="w-16 h-16"
      />
    </div>
  );
}; 