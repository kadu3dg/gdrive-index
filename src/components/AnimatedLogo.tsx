'use client';

import { motion } from 'framer-motion';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex items-center space-x-2"
    >
      {/* Vórtice temporal */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Logo text */}
      <motion.div
        className="relative z-10 flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          DW
        </motion.span>
        <motion.span
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          GDINDEX
        </motion.span>
      </motion.div>
    </motion.div>
  );
} 