'use client';

import { useEffect, useRef, useState } from 'react';

export function TardisSound() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Criar elemento de áudio
    audioRef.current = new Audio('/tardis.mp3');
    audioRef.current.volume = 0.5; // Volume a 50%
    
    // Limpar ao desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current && !isMuted) {
        setHasInteracted(true);
        audioRef.current.play().catch(error => {
          console.error('Erro ao reproduzir som:', error);
        });
      }
    };

    // Adicionar listeners para vários tipos de interação
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted, isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
      } else if (hasInteracted) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 z-50 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
      title={isMuted ? "Ativar som" : "Desativar som"}
    >
      {isMuted ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
} 