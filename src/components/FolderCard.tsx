'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { DWIcon } from './DWIcon';

interface FolderCardProps {
  name: string;
  path: string;
}

export function FolderCard({ name, path }: FolderCardProps) {
  const { themeColors } = useTheme();

  return (
    <Link href={path}>
      <motion.div
        className="p-4 rounded-lg transition-all"
        style={{
          backgroundColor: themeColors.folderBg,
          border: `1px solid ${themeColors.border}`,
          boxShadow: `0 2px 4px ${themeColors.primary}33`
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 4px 12px ${themeColors.accent}66`,
          borderColor: themeColors.accent
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3">
          <DWIcon type="folder" size="lg" />
          <div>
            <h3 
              className="font-medium text-lg"
              style={{ color: themeColors.folderText }}
            >
              {name}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 