'use client';

import React from 'react';
import Image from 'next/image';

interface ShareCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  type: 'episode' | 'season' | 'special';
}

export const ShareCard: React.FC<ShareCardProps> = ({
  title,
  description,
  imageUrl,
  type
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto bg-gray-900 rounded-lg overflow-hidden">
      {/* Círculos Gallifreyanos de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/tardis-logo.png"
              alt="TARDIS"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h2 className="text-blue-400 font-bold text-xl">Doctor Who - GDINDEX</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            type === 'episode' ? 'bg-blue-500 text-white' :
            type === 'season' ? 'bg-yellow-500 text-black' :
            'bg-purple-500 text-white'
          }`}>
            {type === 'episode' ? 'Episódio' :
             type === 'season' ? 'Temporada' :
             'Especial'}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex space-x-4">
          {imageUrl && (
            <div className="relative w-32 h-48 flex-shrink-0">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Compartilhado via TARDIS</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 