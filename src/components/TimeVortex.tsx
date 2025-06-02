'use client';

import { motion } from 'framer-motion';

interface TimeVortexProps {
  isLoading: boolean;
}

export function TimeVortex({ isLoading }: TimeVortexProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Vórtex central com múltiplas camadas */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-600 via-purple-600 to-transparent opacity-50"
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
            filter: "blur(20px)",
          }}
        />
        
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-red-600 via-purple-600 to-transparent opacity-30"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(15px)",
          }}
        />

        {/* Espiral de energia */}
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={`spiral-${i}`}
            className="absolute w-2 h-2 bg-blue-400"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              x: [
                0,
                Math.cos((i * 10 * Math.PI) / 180) * (100 + i * 5),
                Math.cos((i * 10 * Math.PI) / 180) * (50 + i * 5),
              ],
              y: [
                0,
                Math.sin((i * 10 * Math.PI) / 180) * (100 + i * 5),
                Math.sin((i * 10 * Math.PI) / 180) * (50 + i * 5),
              ],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            style={{
              filter: "blur(2px)",
            }}
          />
        ))}
        
        {/* Raios de energia */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute origin-center h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"
            style={{
              width: '400px',
              transform: `rotate(${i * 30}deg)`,
            }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Texto de carregamento com efeito de distorção */}
        <motion.div
          className="absolute text-white text-2xl font-bold"
          animate={{
            y: [0, -5, 0],
            filter: [
              'blur(0px)',
              'blur(1px)',
              'blur(0px)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Viajando pelo vórtex temporal...
          </span>
        </motion.div>
      </div>
    </div>
  );
} 