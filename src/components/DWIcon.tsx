'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface DWIconProps {
  type: 'folder' | 'file' | 'image' | 'video' | 'audio' | 'document' | 'archive';
  size?: 'sm' | 'md' | 'lg';
}

export function DWIcon({ type, size = 'md' }: DWIconProps) {
  const { themeColors } = useTheme();

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const getIconPath = () => {
    switch (type) {
      case 'folder':
        return (
          <path
            d="M2 6a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            fill={themeColors.secondary}
            stroke={themeColors.accent}
          />
        );
      case 'file':
        return (
          <path
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
            fill={themeColors.secondary}
            stroke={themeColors.accent}
          />
        );
      case 'image':
        return (
          <>
            <path
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              fill={themeColors.secondary}
              stroke={themeColors.accent}
            />
            <path
              d="M8 10l2 2 2-2 3 3v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3l4-4z"
              fill={themeColors.accent}
            />
          </>
        );
      case 'video':
        return (
          <>
            <path
              d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              fill={themeColors.secondary}
              stroke={themeColors.accent}
            />
            <path
              d="M10 9l5 3-5 3V9z"
              fill={themeColors.accent}
            />
          </>
        );
      case 'audio':
        return (
          <>
            <path
              d="M18 3a3 3 0 00-3-3H5a3 3 0 00-3 3v14a3 3 0 003 3h10a3 3 0 003-3V3z"
              fill={themeColors.secondary}
              stroke={themeColors.accent}
            />
            <path
              d="M14 5h-4v10h4V5zM6 8v4M10 6v8M14 8v4"
              stroke={themeColors.accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        );
      case 'document':
        return (
          <>
            <path
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              fill={themeColors.secondary}
              stroke={themeColors.accent}
            />
            <path
              d="M8 7h4M8 11h4M8 15h4"
              stroke={themeColors.accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        );
      case 'archive':
        return (
          <>
            <path
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z"
              fill={themeColors.secondary}
              stroke={themeColors.accent}
            />
            <path
              d="M8 7h4M7 11h6"
              stroke={themeColors.accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      className={`${sizes[size]} transition-colors`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {getIconPath()}
    </motion.svg>
  );
} 