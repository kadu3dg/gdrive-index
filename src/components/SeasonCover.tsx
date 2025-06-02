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

const SEASON_BACKGROUNDS = {
  1: '/covers/s1-bg.jpg',  // Fundo com Rose e 9º Doutor
  2: '/covers/s2-bg.jpg',  // Fundo com Rose e 10º Doutor
  3: '/covers/s3-bg.jpg',  // Fundo com Martha e 10º Doutor
  4: '/covers/s4-bg.jpg',  // Fundo com Donna e 10º Doutor
  5: '/covers/s5-bg.jpg',  // Fundo com Amy e 11º Doutor
  6: '/covers/s6-bg.jpg',  // Fundo com River e 11º Doutor
  7: '/covers/s7-bg.jpg',  // Fundo com Clara e 11º Doutor
  8: '/covers/s8-bg.jpg',  // Fundo com Clara e 12º Doutor
  9: '/covers/s9-bg.jpg',  // Fundo com Clara e 12º Doutor
  10: '/covers/s10-bg.jpg', // Fundo com Bill e 12º Doutor
  11: '/covers/s11-bg.jpg', // Fundo com 13ª Doutora
  12: '/covers/s12-bg.jpg', // Fundo com 13ª Doutora
  13: '/covers/s13-bg.jpg', // Fundo com 14º Doutor
  14: '/covers/s14-bg.jpg', // Fundo com 15º Doutor
};

export function SeasonCover({ seasonNumber, doctorNumber }: SeasonCoverProps) {
  const getSeasonColor = () => {
    if (doctorNumber && doctorNumber in SEASON_COLORS) {
      return SEASON_COLORS[doctorNumber as keyof typeof SEASON_COLORS];
    }
    return SEASON_COLORS[(seasonNumber % 15) + 1 as keyof typeof SEASON_COLORS];
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Fundo com gradiente e efeito de partículas */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, ${getSeasonColor()}CC, ${getSeasonColor()}), url('/backgrounds/vortex.jpg')`,
        }}
      />

      {/* Efeito de partículas */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo BBC */}
      <div className="absolute top-4 left-4">
        <svg width="48" height="16" viewBox="0 0 48 16" fill="white">
          <path d="M0 0h12v16H0zM18 0h12v16H18zM36 0h12v16H36z"/>
        </svg>
      </div>

      {/* Logo Doctor Who */}
      <div className="absolute top-8 left-0 right-0 text-center">
        <h1 className="text-white text-3xl font-bold tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          DOCTOR WHO
        </h1>
      </div>

      {/* Texto da temporada */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          {seasonNumber}ª Temporada Completa
        </motion.div>
      </div>

      {/* Overlay com gradiente para dar profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </motion.div>
  );
} 