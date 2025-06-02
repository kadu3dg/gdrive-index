'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function AnimatedLogo() {
  const { themeColors } = useTheme();

  const logoVariants = {
    hover: {
      scale: 1.05,
      filter: 'brightness(1.2)',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="flex items-center space-x-3"
      variants={logoVariants}
      whileHover="hover"
    >
      <motion.div
        className="relative w-12 h-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Diamond background */}
          <path
            d="M50 5L95 50L50 95L5 50L50 5Z"
            fill={themeColors.primary}
            className="filter drop-shadow-md"
          />
          
          {/* Border */}
          <path
            d="M50 2L97 50L50 98L3 50L50 2Z"
            stroke={themeColors.accent}
            strokeWidth="3"
            fill="none"
            className="filter drop-shadow"
          />

          {/* DOCTOR text */}
          <path
            d="M30 30H70V40H30V30Z"
            fill={themeColors.text}
            className="font-bold"
          />

          {/* WHO text */}
          <path
            d="M35 45H65V60H35V45Z"
            fill={themeColors.accent}
            className="font-black"
          />

          {/* Bottom accent */}
          <path
            d="M40 65H60V70H40V65Z"
            fill={themeColors.text}
          />

          {/* Glow effect */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#glow)"
            fillOpacity="0.3"
          />

          {/* Gradient definitions */}
          <defs>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor={themeColors.accent} />
              <stop offset="100%" stopColor={themeColors.primary} stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-black tracking-wider"
        style={{
          color: themeColors.text,
          textShadow: `0 0 10px ${themeColors.accent}`,
          letterSpacing: '0.1em'
        }}
      >
        DW GDINDEX
      </motion.div>
    </motion.div>
  );
} 