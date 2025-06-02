'use client';

import { motion } from 'framer-motion';

interface SonicEffectProps {
  isActive: boolean;
}

export function SonicEffect({ isActive }: SonicEffectProps) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Brilho central */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-cyan-400 to-transparent opacity-50"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        style={{ filter: 'blur(8px)' }}
      />

      {/* Ondas sonoras */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 border-2 rounded-full"
          style={{
            borderColor: i % 2 === 0 ? '#22D3EE' : '#06B6D4',
          }}
          animate={{
            scale: [1, 2],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.2,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Partículas de energia */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 50],
            y: [0, (Math.random() - 0.5) * 50],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Raios de energia */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
          style={{
            width: '100%',
            transformOrigin: 'left',
            transform: `rotate(${i * 60}deg)`,
          }}
          animate={{
            scaleX: [0.2, 1, 0.2],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
} 