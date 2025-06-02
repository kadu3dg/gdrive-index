'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites, companions } from '@/contexts/FavoritesContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

export function FavoritesList() {
  const { favorites, removeFavorite, getFavoritesByCompanion } = useFavorites();
  const { themeColors } = useTheme();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-xl text-gray-400">
            Nenhuma memória guardada pelos companions ainda...
          </p>
          <p className="text-gray-500">
            Clique no ícone do coração em qualquer arquivo para adicionar aos favoritos
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {companions.map(companion => {
        const companionFavorites = getFavoritesByCompanion(companion.id);
        if (companionFavorites.length === 0) return null;

        return (
          <motion.div
            key={companion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div
                className="w-12 h-12 rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(${companion.image})`,
                  backgroundColor: themeColors.secondary,
                }}
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  {companion.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {companionFavorites.length} {companionFavorites.length === 1 ? 'memória' : 'memórias'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 mt-4">
              <AnimatePresence>
                {companionFavorites.map(favorite => (
                  <motion.div
                    key={favorite.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                  >
                    <Link
                      href={favorite.path}
                      className="flex-1 hover:text-blue-400 transition-colors"
                    >
                      <span className="text-white">{favorite.name}</span>
                      <span className="text-sm text-gray-400 block">
                        Adicionado em {new Date(favorite.addedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </Link>
                    <button
                      onClick={() => removeFavorite(favorite.path)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remover dos favoritos"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 