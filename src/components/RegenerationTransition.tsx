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
          {/* Fundo de energia dourada */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-yellow-400 via-yellow-500 to-transparent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.4, 1, 0],
              scale: [0.8, 1.2, 1, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          />
          
          {/* Explosão de energia */}
          <motion.div
            className="absolute inset-0 bg-gradient-conic from-yellow-500 via-orange-500 to-yellow-500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.5, 1],
              ease: "easeOut",
            }}
            style={{
              filter: "blur(20px)",
            }}
          />

          {/* Partículas de regeneração em espiral */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  scale: 0,
                  backgroundColor: i % 2 === 0 ? "#FCD34D" : "#F59E0B",
                }}
                animate={{
                  x: [
                    "50vw",
                    `${50 + Math.cos((i * 7.2) * Math.PI / 180) * 50}vw`,
                    `${50 + Math.cos((i * 7.2) * Math.PI / 180) * 100}vw`,
                  ],
                  y: [
                    "50vh",
                    `${50 + Math.sin((i * 7.2) * Math.PI / 180) * 50}vh`,
                    `${50 + Math.sin((i * 7.2) * Math.PI / 180) * 100}vh`,
                  ],
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.5, 1],
                  ease: "easeOut",
                  delay: i * 0.01,
                }}
                style={{
                  filter: "blur(2px)",
                }}
              />
            ))}
          </div>

          {/* Ondas de energia */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-400"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: ["0px", "100vw"],
                height: ["0px", "100vh"],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                ease: "easeOut",
                repeat: 1,
              }}
            />
          ))}

          {/* Flash final */}
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