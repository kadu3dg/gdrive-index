'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companions } from '@/contexts/FavoritesContext';
import { useTheme } from '@/contexts/ThemeContext';

interface CompanionSelectorProps {
  onSelect: (companionId: string) => void;
  onClose: () => void;
}

export function CompanionSelector({ onSelect, onClose }: CompanionSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { themeColors } = useTheme();

  const handleSelect = (companionId: string) => {
    setSelectedId(companionId);
    setTimeout(() => {
      onSelect(companionId);
      onClose();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Escolha um Companion para guardar esta memória
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {companions.map(companion => (
            <motion.button
              key={companion.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg transition-colors ${
                selectedId === companion.id
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleSelect(companion.id)}
            >
              <div className="aspect-square relative mb-2 overflow-hidden rounded-full">
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${companion.image})`,
                    backgroundColor: themeColors.secondary,
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-white text-center">
                {companion.name}
              </h3>
              <p className="text-sm text-gray-300 text-center">
                {companion.era}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 