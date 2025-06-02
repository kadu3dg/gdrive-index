'use client';

import { useState, useCallback } from 'react';
import { useDoctorWho } from '@/contexts/DoctorWhoContext';

export function useFileSystem() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { startLoading, stopLoading, showTardisLogo, hideTardisLogo, startRegeneration } = useDoctorWho();

  const navigateToFolder = useCallback(async (path: string) => {
    try {
      startLoading();
      showTardisLogo();

      // Simular tempo de carregamento para os efeitos visuais
      await new Promise(resolve => setTimeout(resolve, 1500));

      setCurrentPath(path);
      
      // Esconder o TARDIS após a navegação
      setTimeout(() => {
        hideTardisLogo();
        stopLoading();
      }, 500);
    } catch (error) {
      console.error('Erro ao navegar:', error);
      stopLoading();
      hideTardisLogo();
    }
  }, [startLoading, stopLoading, showTardisLogo, hideTardisLogo]);

  const changePage = useCallback(async (newPath: string) => {
    try {
      await startRegeneration();
      setCurrentPath(newPath);
    } catch (error) {
      console.error('Erro ao mudar de página:', error);
    }
  }, [startRegeneration]);

  return {
    currentPath,
    navigateToFolder,
    changePage,
  };
} 