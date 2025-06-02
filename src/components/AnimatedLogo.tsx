'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function AnimatedLogo() {
  const { themeColors } = useTheme();

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const borderVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className="flex items-center space-x-3"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-14 h-14">
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          {/* Base diamond shape */}
          <motion.path
            d="M50 5L95 50L50 95L5 50L50 5Z"
            fill={themeColors.primary}
            className="filter drop-shadow-md"
          />
          
          {/* Rotating border */}
          <motion.g
            variants={borderVariants}
            animate="animate"
          >
            <path
              d="M50 2L97 50L50 98L3 50L50 2Z"
              stroke={themeColors.accent}
              strokeWidth="2"
              fill="none"
              className="filter drop-shadow"
            />
            {/* Gallifreyan circles */}
            {[0, 90, 180, 270].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <circle
                  cx="50"
                  cy="15"
                  r="3"
                  stroke={themeColors.accent}
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="15"
                  r="1.5"
                  stroke={themeColors.accent}
                  strokeWidth="0.5"
                  fill="none"
                />
              </g>
            ))}
          </motion.g>

          {/* DOCTOR text with metallic effect */}
          <path
            d="M25 30H75V42H25V30Z"
            fill={`url(#doctorGradient)`}
            className="font-bold"
          />

          {/* WHO text with glow */}
          <motion.path
            d="M30 48H70V65H30V48Z"
            fill={themeColors.accent}
            className="font-black"
            variants={glowVariants}
            animate="animate"
          />

          {/* Bottom accent */}
          <path
            d="M40 70H60V75H40V70Z"
            fill={themeColors.text}
          />

          {/* Glow effects */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#glow)"
            fillOpacity="0.3"
            variants={glowVariants}
            animate="animate"
          />

          {/* Gradients */}
          <defs>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor={themeColors.accent} />
              <stop offset="100%" stopColor={themeColors.primary} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="doctorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={themeColors.text} />
              <stop offset="50%" stopColor={themeColors.accent} />
              <stop offset="100%" stopColor={themeColors.text} />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-black tracking-wider"
        style={{
          color: themeColors.text,
          textShadow: `0 0 10px ${themeColors.accent}, 0 0 20px ${themeColors.primary}`,
          letterSpacing: '0.1em'
        }}
      >
        DW GDINDEX
      </motion.div>
    </motion.div>
  );
} 