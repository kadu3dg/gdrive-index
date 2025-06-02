'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '@/config/themes';

type ThemeType = 'tardis' | 'gallifrey' | 'classic' | 'newWho';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  themeColors: typeof themes.tardis;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('tardis');

  const toggleTheme = () => {
    setCurrentTheme(current => {
      const themeOrder: ThemeType[] = ['tardis', 'gallifrey', 'classic', 'newWho'];
      const currentIndex = themeOrder.indexOf(current);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      return themeOrder[nextIndex];
    });
  };

  useEffect(() => {
    // Aplicar as cores do tema atual ao documento
    const root = document.documentElement;
    const colors = themes[currentTheme];

    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-border', colors.border);

    // Adicionar classe ao body para identificar o tema atual
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: setCurrentTheme,
        toggleTheme,
        themeColors: themes[currentTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 