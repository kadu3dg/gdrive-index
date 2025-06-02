'use client';

import { motion } from 'framer-motion';
import { animations } from '@/config/themes';

export function LoadingVortex() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <style jsx global>{`
        ${animations.tardisVortex}
      `}</style>
      <motion.div
        className="w-32 h-32 rounded-full border-4 border-blue-500 border-t-transparent"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full rounded-full border-4 border-yellow-400 border-t-transparent animate-[tardisVortex_3s_linear_infinite]">
          <div className="w-full h-full rounded-full border-4 border-white border-t-transparent animate-[tardisVortex_2s_linear_infinite_reverse]" />
        </div>
      </motion.div>
      <div className="absolute text-white text-xl font-bold mt-40">
        Viajando pelo vortex temporal...
      </div>
    </div>
  );
} 