'use client';

import { motion } from 'framer-motion';
import { animations } from '@/config/themes';

type IconType = 'folder' | 'video' | 'audio' | 'image' | 'document' | 'other';

interface DWIconProps {
  type: IconType;
  className?: string;
}

export function DWIcon({ type, className = '' }: DWIconProps) {
  const getIconContent = () => {
    switch (type) {
      case 'folder':
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <path
                d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
                className="fill-blue-500 dark:fill-blue-600"
              />
              <path
                d="M4 8H20V18H4V8Z"
                className="fill-blue-400 dark:fill-blue-500"
              />
              {/* TARDIS windows */}
              <rect x="6" y="10" width="2" height="2" className="fill-white" />
              <rect x="10" y="10" width="2" height="2" className="fill-white" />
              <rect x="14" y="10" width="2" height="2" className="fill-white" />
              <rect x="18" y="10" width="2" height="2" className="fill-white" />
            </svg>
          </motion.div>
        );

      case 'video':
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                className="fill-red-500 dark:fill-red-600"
              />
              <path
                d="M10 8L16 12L10 16V8Z"
                className="fill-white"
              />
            </svg>
          </motion.div>
        );

      case 'audio':
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                className="fill-green-500 dark:fill-green-600"
              />
              <path
                d="M12 8V16M9 10V14M15 6V18M6 12H18"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                className="fill-purple-500 dark:fill-purple-600"
              />
              <circle cx="8" cy="9" r="2" className="fill-white" />
              <path
                d="M2 16L7 11L10 14L15 9L22 16V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V16Z"
                className="fill-purple-400 dark:fill-purple-500"
              />
            </svg>
          </motion.div>
        );

      case 'document':
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"
                className="fill-yellow-500 dark:fill-yellow-600"
              />
              <path
                d="M14 2L20 8H14V2Z"
                className="fill-yellow-400 dark:fill-yellow-500"
              />
              {/* Gallifreyan circles */}
              <circle cx="12" cy="14" r="4" className="stroke-white" fill="none" strokeWidth="1" />
              <circle cx="12" cy="14" r="2" className="stroke-white" fill="none" strokeWidth="1" />
            </svg>
          </motion.div>
        );

      default:
        return (
          <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <rect
                x="4"
                y="2"
                width="16"
                height="20"
                rx="2"
                className="fill-gray-500 dark:fill-gray-600"
              />
              {/* Sonic Screwdriver pattern */}
              <path
                d="M8 8H16M8 12H16M8 16H13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        );
    }
  };

  return (
    <>
      <style jsx global>{`
        ${animations.materialize}
        ${animations.sonicScan}
      `}</style>
      {getIconContent()}
    </>
  );
} 