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
}

const themeColorSchemes: Record<Theme, ThemeColors> = {
  tardis: {
    primary: '#1B75BC',
    secondary: '#003B6F',
    accent: '#00A0E3',
    background: '#001F3F',
    text: '#FFFFFF',
    textSecondary: '#B8E3FF',
    border: '#2196F3'
  },
  gallifrey: {
    primary: '#FF4500',
    secondary: '#8B0000',
    accent: '#FFD700',
    background: '#1A0000',
    text: '#FFFFFF',
    textSecondary: '#FFB6B6',
    border: '#FF6B6B'
  },
  classic: {
    primary: '#A0A0A0',
    secondary: '#4A4A4A',
    accent: '#E0E0E0',
    background: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#808080'
  },
  newWho: {
    primary: '#F1C40F',
    secondary: '#D35400',
    accent: '#E74C3C',
    background: '#2C3E50',
    text: '#FFFFFF',
    textSecondary: '#ECF0F1',
    border: '#E67E22'
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