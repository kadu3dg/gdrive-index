import React from 'react';
import Image from 'next/image';

interface File {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
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

export const FilePreview: React.FC<{ file: File }> = ({ file }) => {
  if (file.mimeType.startsWith('video/')) {
    const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
    return (
      <div className="relative h-40 bg-black">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    );
  }

  if (file.thumbnailLink) {
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
    <div className="flex items-center justify-center h-full">
      <Image
        src={getFileIcon(file.mimeType)}
        alt={file.mimeType}
        width={64}
        height={64}
        className="opacity-50"
      />
    </div>
  );
}; 