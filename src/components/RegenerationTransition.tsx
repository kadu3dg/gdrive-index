'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface RegenerationTransitionProps {
  isRegenerating: boolean;
  onComplete: () => void;
}

export function RegenerationTransition({ isRegenerating, onComplete }: RegenerationTransitionProps) {
  return (
    <AnimatePresence>
      {isRegenerating && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          {/* Efeito de energia dourada */}
          <motion.div
            className="absolute inset-0 bg-yellow-500/20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 2,
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          />
          
          {/* Partículas de regeneração */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                }}
                animate={{
                  x: [
                    "50vw",
                    `${Math.random() * 100}vw`,
                    `${Math.random() * 100}vw`,
                  ],
                  y: [
                    "50vh",
                    `${Math.random() * 100}vh`,
                    `${Math.random() * 100}vh`,
                  ],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  ease: "easeOut",
                }}
                style={{
                  filter: "blur(2px)",
                }}
              />
            ))}
          </div>

          {/* Flash de luz */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.5, 1],
              delay: 1.5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 