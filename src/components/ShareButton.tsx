'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  fileId: string;
  fileName: string;
}

const TARDIS_MESSAGES = [
  "Vortex temporal estabelecido! Compartilhando através do tempo e espaço...",
  "Coordenadas temporais definidas! Enviando arquivo...",
  "Allons-y! Compartilhamento em andamento...",
  "Geronimo! Arquivo viajando pelo vortex...",
  "Fantastic! Iniciando sequência de compartilhamento...",
];

export const ShareButton: React.FC<ShareButtonProps> = ({ fileId, fileName }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [message, setMessage] = useState('');

  const handleShare = async () => {
    setIsSharing(true);
    setMessage(TARDIS_MESSAGES[Math.floor(Math.random() * TARDIS_MESSAGES.length)]);

    try {
      const shareData = {
        title: 'Doctor Who - GDINDEX',
        text: `Confira "${fileName}" no GDINDEX do Doctor Who!`,
        url: `${window.location.origin}/file/${fileId}`,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setMessage('Link copiado para a área de transferência!');
      }
    } catch (error) {
      setMessage('Erro no compartilhamento. A TARDIS deve estar com problemas...');
    } finally {
      setTimeout(() => {
        setIsSharing(false);
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-5 h-5 ${isSharing ? 'animate-spin' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span>Compartilhar</span>
      </motion.button>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-2 bg-black/80 text-white text-sm rounded-lg text-center"
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}; 