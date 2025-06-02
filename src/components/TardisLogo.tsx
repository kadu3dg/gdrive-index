'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TardisLogoProps {
  isVisible: boolean;
}

export function TardisLogo({ isVisible }: TardisLogoProps) {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.5, 1, 0.8, 1],
            scale: [0.5, 1.2, 0.8, 1.1, 1],
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.5, times: [0, 0.2, 0.5, 0.8, 1] }}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            <Image
              src="/tardis-logo.svg"
              alt="TARDIS"
              width={192}
              height={192}
              className="w-full h-full object-contain"
            />
            <motion.div
              className="absolute inset-0 bg-blue-500/30 blur-xl"
              animate={{
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 