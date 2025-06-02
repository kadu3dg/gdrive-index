'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function AnimatedLogo() {
  const { themeColors } = useTheme();

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: {
        duration: 0.3,
        rotate: {
          repeat: Infinity,
          duration: 1.5
        }
      }
    }
  };

  return (
    <motion.div
      className="flex items-center space-x-2"
      variants={logoVariants}
      whileHover="hover"
    >
      <motion.div
        className="relative w-10 h-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* TARDIS base */}
          <rect
            x="10"
            y="5"
            width="20"
            height="30"
            fill={themeColors.primary}
            rx="2"
          />
          {/* TARDIS windows */}
          <rect x="13" y="8" width="4" height="4" fill={themeColors.accent} />
          <rect x="23" y="8" width="4" height="4" fill={themeColors.accent} />
          <rect x="13" y="15" width="4" height="4" fill={themeColors.accent} />
          <rect x="23" y="15" width="4" height="4" fill={themeColors.accent} />
          {/* TARDIS light */}
          <rect x="18" y="2" width="4" height="3" fill={themeColors.secondary} />
          {/* TARDIS panels */}
          <rect x="12" y="22" width="16" height="1" fill={themeColors.secondary} />
          <rect x="12" y="25" width="16" height="1" fill={themeColors.secondary} />
          <rect x="12" y="28" width="16" height="1" fill={themeColors.secondary} />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold"
        style={{ color: themeColors.text }}
      >
        DW GDINDEX
      </motion.div>
    </motion.div>
  );
} 