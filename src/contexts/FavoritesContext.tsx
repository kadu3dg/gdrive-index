'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Companion {
  id: string;
  name: string;
  era: string;
  image: string;
}

export const companions: Companion[] = [
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

interface FavoriteItem {
  path: string;
  name: string;
  companionId: string;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (path: string, name: string, companionId: string) => void;
  removeFavorite: (path: string) => void;
  getFavoritesByCompanion: (companionId: string) => FavoriteItem[];
  isItemFavorited: (path: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Carregar favoritos do localStorage ao iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('dwFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Salvar favoritos no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('dwFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (path: string, name: string, companionId: string) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.path === path)) return prev;
      return [...prev, {
        path,
        name,
        companionId,
        addedAt: new Date().toISOString()
      }];
    });
  };

  const removeFavorite = (path: string) => {
    setFavorites(prev => prev.filter(fav => fav.path !== path));
  };

  const getFavoritesByCompanion = (companionId: string) => {
    return favorites.filter(fav => fav.companionId === companionId);
  };

  const isItemFavorited = (path: string) => {
    return favorites.some(fav => fav.path === path);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        getFavoritesByCompanion,
        isItemFavorited
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 