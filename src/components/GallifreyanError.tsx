'use client';

import { motion } from 'framer-motion';

interface GallifreyanErrorProps {
  message: string;
}

export function GallifreyanError({ message }: GallifreyanErrorProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Círculos Gallifreyanos */}
      <motion.div
        className="relative w-64 h-64"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Círculo externo */}
        <div className="absolute inset-0 border-4 border-red-500 rounded-full" />
        
        {/* Círculos internos */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-red-500"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 60}deg) translateY(-24px)`,
              transformOrigin: 'center center',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Linhas circulares */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute border-2 border-red-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: `${100 - i * 20}%`,
              height: `${100 - i * 20}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Símbolos Gallifreyanos */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute w-3 h-8 bg-red-500"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg) translateY(-56px)`,
              transformOrigin: 'bottom center',
            }}
            animate={{
              scaleY: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Mensagem de erro */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-red-500 font-bold text-xl mb-2">
          Erro detectado nos campos temporais
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {message}
        </div>
      </motion.div>
    </div>
  );
} 