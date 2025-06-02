'use client';

import { motion } from 'framer-motion';
import { FavoritesList } from '@/components/FavoritesList';

export default function FavoritesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Memórias dos Companions
        </h1>
        <p className="text-gray-400">
          Arquivos e pastas guardados pelos companions em suas viagens pelo tempo e espaço
        </p>
      </motion.div>

      <FavoritesList />
    </div>
  );
} 