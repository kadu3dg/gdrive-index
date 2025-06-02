'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '@/contexts/FavoritesContext';
import { CompanionSelector } from './CompanionSelector';

interface FavoriteButtonProps {
  path: string;
  name: string;
}

export function FavoriteButton({ path, name }: FavoriteButtonProps) {
  const { isItemFavorited, addFavorite, removeFavorite } = useFavorites();
  const [showSelector, setShowSelector] = useState(false);
  const isFavorite = isItemFavorited(path);

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite(path);
    } else {
      setShowSelector(true);
    }
  };

  const handleSelect = (companionId: string) => {
    addFavorite(path, name, companionId);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`p-2 rounded-full transition-colors ${
          isFavorite
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-red-500'
        }`}
        title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {showSelector && (
          <CompanionSelector
            onSelect={handleSelect}
            onClose={() => setShowSelector(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 