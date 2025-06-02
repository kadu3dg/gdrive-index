'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'tardis' | 'gallifrey' | 'classic' | 'newWho';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const themeColorSchemes: Record<Theme, ThemeColors> = {
  tardis: {
    primary: '#003B6F',
    secondary: '#1B75BC',
    accent: '#00A0E3',
    background: '#001F3F',
    text: '#FFFFFF'
  },
  gallifrey: {
    primary: '#8B0000',
    secondary: '#FF4500',
    accent: '#FFD700',
    background: '#2B0000',
    text: '#FFFFFF'
  },
  classic: {
    primary: '#4A4A4A',
    secondary: '#808080',
    accent: '#C0C0C0',
    background: '#1A1A1A',
    text: '#FFFFFF'
  },
  newWho: {
    primary: '#9B2C2C',
    secondary: '#D35400',
    accent: '#F1C40F',
    background: '#2C3E50',
    text: '#FFFFFF'
  }
};

interface ThemeContextType {
  currentTheme: Theme;
  themeColors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('tardis');

  useEffect(() => {
    const savedTheme = localStorage.getItem('dwTheme') as Theme;
    if (savedTheme && Object.keys(themeColorSchemes).includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dwTheme', currentTheme);
    document.documentElement.style.setProperty('--primary-color', themeColorSchemes[currentTheme].primary);
    document.documentElement.style.setProperty('--secondary-color', themeColorSchemes[currentTheme].secondary);
    document.documentElement.style.setProperty('--accent-color', themeColorSchemes[currentTheme].accent);
    document.documentElement.style.setProperty('--background-color', themeColorSchemes[currentTheme].background);
    document.documentElement.style.setProperty('--text-color', themeColorSchemes[currentTheme].text);
  }, [currentTheme]);

  const toggleTheme = () => {
    const themes: Theme[] = ['tardis', 'gallifrey', 'classic', 'newWho'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeColors: themeColorSchemes[currentTheme],
        toggleTheme
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