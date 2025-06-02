'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function TardisSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/tardis.mp3');
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignora erros de reprodução automática
      });
    }
  }, [pathname]);

  return null;
} 