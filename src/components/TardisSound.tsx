'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function TardisSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    // Criar o elemento de áudio apenas uma vez
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/sounds/tardis.mp3');
      audioRef.current.volume = 0.3;
      
      // Carregar a preferência do usuário
      const soundEnabled = localStorage.getItem('dwSoundEnabled');
      setIsEnabled(soundEnabled === 'true');
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Salvar preferência do usuário
    localStorage.setItem('dwSoundEnabled', isEnabled.toString());
  }, [isEnabled]);

  useEffect(() => {
    // Tocar som apenas quando houver mudança real de rota
    if (pathname !== lastPathRef.current && isEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignora erros de reprodução automática
      });
      lastPathRef.current = pathname;
    }
  }, [pathname, isEnabled]);

  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary hover:bg-opacity-90 text-text shadow-lg transition-all hover:scale-110"
      title={isEnabled ? "Desativar som" : "Ativar som"}
    >
      {isEnabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
} 