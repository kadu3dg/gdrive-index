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
    <div className="absolute inset-0">
      <Image
        src={coverUrl}
        alt="Capa da pasta"
        fill
        className="object-cover rounded-lg"
      />
      {/* Overlay gradiente para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
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

  // Mapeamento de temporadas para Doutores
  const seasonToDoctor: { [key: number]: number } = {
    1: 9,  // 9º Doutor
    2: 10, // 10º Doutor
    3: 10,
    4: 10,
    5: 11, // 11º Doutor
    6: 11,
    7: 11,
    8: 12, // 12º Doutor
    9: 12,
    10: 13, // 13ª Doutora
    11: 13,
    12: 13,
    13: 14, // 14º Doutor
    14: 15, // 15º Doutor
  };

  if (isSeasonFolder && seasonNumber) {
    return (
      <div className="relative w-full h-full">
        <FolderCover folderId={file.id} />
        <SeasonCover 
          seasonNumber={seasonNumber} 
          doctorNumber={seasonToDoctor[seasonNumber]}
        />
      </div>
    );
  }

  if (isFolder) {
    return (
      <div className="relative w-full h-full">
        <FolderCover folderId={file.id} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/folder.svg"
            alt={file.name}
            width={64}
            height={64}
            className="w-16 h-16 z-10"
          />
        </div>
      </div>
    );
  }

  if (isVideo) {
    const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
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