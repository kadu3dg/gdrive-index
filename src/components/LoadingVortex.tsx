'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingVortexProps {
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingVortex({ size = 'md' }: LoadingVortexProps) {
  const { themeColors } = useTheme();
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const vortexVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const spiralVariants = {
    animate: {
      rotate: -360,
      scale: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          border: `4px solid ${themeColors.accent}`,
          borderRadius: '50%',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent'
        }}
        variants={vortexVariants}
        animate="animate"
      />
      <motion.div
        className="absolute inset-0"
        style={{
          border: `4px solid ${themeColors.primary}`,
          borderRadius: '50%',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent'
        }}
        variants={spiralVariants}
        animate="animate"
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'transparent',
          backgroundImage: `radial-gradient(circle, ${themeColors.secondary} 0%, transparent 70%)`,
          opacity: 0.3
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
} 