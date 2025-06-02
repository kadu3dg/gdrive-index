'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface DoctorWhoContextType {
  isLoading: boolean;
  isRegenerating: boolean;
  showTardis: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  startRegeneration: () => Promise<void>;
  showTardisLogo: () => void;
  hideTardisLogo: () => void;
}

const DoctorWhoContext = createContext<DoctorWhoContextType | null>(null);

export function DoctorWhoProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showTardis, setShowTardis] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const startRegeneration = useCallback(async () => {
    setIsRegenerating(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsRegenerating(false);
        resolve();
      }, 2000);
    });
  }, []);

  const showTardisLogo = useCallback(() => {
    setShowTardis(true);
  }, []);

  const hideTardisLogo = useCallback(() => {
    setShowTardis(false);
  }, []);

  return (
    <DoctorWhoContext.Provider
      value={{
        isLoading,
        isRegenerating,
        showTardis,
        startLoading,
        stopLoading,
        startRegeneration,
        showTardisLogo,
        hideTardisLogo,
      }}
    >
      {children}
    </DoctorWhoContext.Provider>
  );
}

export function useDoctorWho() {
  const context = useContext(DoctorWhoContext);
  if (!context) {
    throw new Error('useDoctorWho must be used within a DoctorWhoProvider');
  }
  return context;
} 