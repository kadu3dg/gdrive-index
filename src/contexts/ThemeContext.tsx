'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'tardis' | 'gallifrey' | 'classic' | 'newWho';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  cardBg: string;
  folderBg: string;
  folderText: string;
}

const themeColorSchemes: Record<Theme, ThemeColors> = {
  tardis: {
    primary: '#0066CC',
    secondary: '#003B6F',
    accent: '#00A0E3',
    background: '#001830',
    text: '#FFFFFF',
    textSecondary: '#B8E3FF',
    border: '#0088FF',
    cardBg: '#002347',
    folderBg: '#004080',
    folderText: '#FFFFFF'
  },
  gallifrey: {
    primary: '#CC0000',
    secondary: '#800000',
    accent: '#FF4500',
    background: '#1A0000',
    text: '#FFFFFF',
    textSecondary: '#FFB6B6',
    border: '#FF2200',
    cardBg: '#2D0000',
    folderBg: '#B30000',
    folderText: '#FFFFFF'
  },
  classic: {
    primary: '#404040',
    secondary: '#202020',
    accent: '#808080',
    background: '#101010',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#606060',
    cardBg: '#282828',
    folderBg: '#505050',
    folderText: '#FFFFFF'
  },
  newWho: {
    primary: '#003366',
    secondary: '#001F3F',
    accent: '#0088FF',
    background: '#000C1A',
    text: '#FFFFFF',
    textSecondary: '#99CCFF',
    border: '#004C99',
    cardBg: '#001529',
    folderBg: '#004080',
    folderText: '#FFFFFF'
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
    const colors = themeColorSchemes[currentTheme];
    
    // Aplicar cores ao :root
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value);
    });

    // Aplicar classe ao body para estilos específicos do tema
    document.body.className = `theme-${currentTheme}`;
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

export const companions = [
  {
    id: 'rose',
    name: 'Rose Tyler',
    era: 'New Who',
    image: '/companions/rose.png'
  },
  {
    id: 'donna',
    name: 'Donna Noble',
    era: 'New Who',
    image: '/companions/donna.png'
  },
  {
    id: 'amy',
    name: 'Amy Pond',
    era: 'New Who',
    image: '/companions/amy.png'
  },
  {
    id: 'sarah-jane',
    name: 'Sarah Jane Smith',
    era: 'Classic',
    image: '/companions/sarah-jane.png'
  },
  {
    id: 'jack',
    name: 'Captain Jack Harkness',
    era: 'New Who',
    image: '/companions/jack.png'
  }
]; 