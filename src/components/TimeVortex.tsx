'use client';

import { motion } from 'framer-motion';

interface TimeVortexProps {
  isLoading: boolean;
}

export function TimeVortex({ isLoading }: TimeVortexProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Vórtex central */}
        <motion.div
          className="w-96 h-96 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(8px)",
          }}
        />
        
        {/* Partículas do vórtex */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white rounded-full"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              x: [0, Math.cos(i * 36) * 200, 0],
              y: [0, Math.sin(i * 36) * 200, 0],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(2px)",
            }}
          />
        ))}
        
        {/* Texto de carregamento */}
        <motion.div
          className="absolute text-white text-2xl font-bold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Viajando pelo vórtex temporal...
        </motion.div>
      </div>
    </div>
  );
} 