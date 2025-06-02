'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SeasonCoverProps {
  seasonNumber: number;
  doctorNumber: number;
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

export const SeasonCover: React.FC<SeasonCoverProps> = ({ seasonNumber }) => {
  const getSeasonColor = () => {
    if (seasonNumber in SEASON_COLORS) {
      return SEASON_COLORS[seasonNumber as keyof typeof SEASON_COLORS];
    }
    // Cor padrão baseada no número da temporada
    return SEASON_COLORS[(seasonNumber % 15) + 1 as keyof typeof SEASON_COLORS];
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Círculos Gallifreyanos */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Círculo externo */}
          <div className="absolute inset-0 border-2 border-white rounded-full animate-spin-slow" />
          
          {/* Círculo médio */}
          <div className="absolute inset-4 border-2 border-white rounded-full animate-spin-reverse" />
          
          {/* Círculo interno */}
          <div className="absolute inset-8 border-2 border-white rounded-full animate-spin-slow" />
          
          {/* Símbolos Gallifreyanos (pontos) */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-32px)`,
                  transformOrigin: '0 32px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Número da Temporada */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-6xl font-bold z-10">
          {seasonNumber}ª
        </div>
      </div>
    </div>
  );
}; 