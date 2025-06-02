'use client';

import { motion } from 'framer-motion';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center justify-center"
    >
      {/* Efeito de brilho de fundo */}
      <motion.div
        className="absolute inset-0 bg-blue-500 blur-xl opacity-20 dark:opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Container do logo */}
      <motion.div
        className="relative z-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 p-3 rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* DOCTOR */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            DOCTOR
          </span>
        </motion.div>

        {/* WHO */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-black tracking-wider text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            WHO
          </span>
        </motion.div>

        {/* GDINDEX */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm font-semibold text-center mt-1"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            GDINDEX
          </span>
        </motion.div>

        {/* Bordas decorativas */}
        <motion.div
          className="absolute inset-0 border-2 border-yellow-400 dark:border-yellow-500 rounded-lg"
          animate={{
            boxShadow: [
              "0 0 0 rgba(234, 179, 8, 0.4)",
              "0 0 20px rgba(234, 179, 8, 0.6)",
              "0 0 0 rgba(234, 179, 8, 0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
} 