'use client';

import { motion } from 'framer-motion';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2"
    >
      <motion.span
        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          DW
        </motion.span>
        {' '}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
        >
          GDINDEX
        </motion.span>
      </motion.span>
    </motion.div>
  );
} 