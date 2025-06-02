'use client';

import { motion } from 'framer-motion';

interface SeasonCoverProps {
  seasonNumber: number;
  doctorNumber?: number;
}

const SEASON_COLORS = {
  1: '#003B6F', // Primeiro Doutor - Azul escuro clássico
  2: '#1A472A', // Segundo Doutor - Verde escuro
  3: '#7F0909', // Terceiro Doutor - Vermelho vibrante
  4: '#946B2D', // Quarto Doutor - Marrom (cachecol)
  5: '#5D5D5D', // Quinto Doutor - Bege/Creme
  6: '#2A623D', // Sexto Doutor - Multi-colorido
  7: '#450084', // Sétimo Doutor - Roxo escuro
  8: '#000000', // Oitavo Doutor - Vitoriano escuro
  9: '#003B6F', // Nono Doutor - Azul marinho (jaqueta)
  10: '#8B0000', // Décimo Doutor - Vermelho (Converse)
  11: '#4A4A4A', // Décimo Primeiro Doutor - Tweed marrom
  12: '#1B1B1B', // Décimo Segundo Doutor - Preto
  13: '#FFB6C1', // Décima Terceira Doutora - Rosa
  14: '#2E5A88', // Décimo Quarto Doutor - Azul moderno
  15: '#6B238E', // Décimo Quinto Doutor - Roxo
};

export function SeasonCover({ seasonNumber, doctorNumber }: SeasonCoverProps) {
  const getSeasonColor = () => {
    if (doctorNumber && doctorNumber in SEASON_COLORS) {
      return SEASON_COLORS[doctorNumber as keyof typeof SEASON_COLORS];
    }
    // Cor padrão baseada no número da temporada
    return SEASON_COLORS[(seasonNumber % 15) + 1 as keyof typeof SEASON_COLORS];
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Fundo com gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${getSeasonColor()}CC 0%, ${getSeasonColor()} 100%)`,
        }}
      />

      {/* Círculos Gallifreyanos */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-white rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: `${80 - i * 20}%`,
              height: `${80 - i * 20}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* TARDIS silhueta */}
      <div className="absolute bottom-4 right-4 w-12 h-16 opacity-20">
        <svg viewBox="0 0 24 32" fill="white">
          <path d="M2 0h20v32H2V0zm2 2v4h16V2H4zm0 6v20h16V8H4zm4 2h8v2H8v-2zm0 16h8v2H8v-2z"/>
        </svg>
      </div>

      {/* Texto da temporada */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          {seasonNumber}ª
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl"
        >
          Temporada
        </motion.div>
      </div>
    </motion.div>
  );
} 