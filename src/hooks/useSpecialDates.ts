'use client';

import { useState, useEffect } from 'react';

interface SpecialDate {
  date: Date;
  type: 'anniversary' | 'regeneration' | 'special';
  title: string;
  description: string;
}

const SPECIAL_DATES: SpecialDate[] = [
  {
    date: new Date(1963, 10, 23), // 23 de Novembro de 1963
    type: 'anniversary',
    title: 'Aniversário de Doctor Who',
    description: 'O primeiro episódio foi ao ar neste dia em 1963!',
  },
  {
    date: new Date(2005, 2, 26), // 26 de Março de 2005
    type: 'regeneration',
    title: 'Retorno da Série',
    description: 'Doctor Who retornou à TV após 16 anos!',
  },
  {
    date: new Date(2023, 10, 25), // 25 de Novembro de 2023
    type: 'special',
    title: '60º Aniversário',
    description: 'Celebrando 60 anos de viagens no tempo e espaço!',
  },
  // Adicione mais datas especiais aqui
];

export function useSpecialDates() {
  const [activeSpecialDate, setActiveSpecialDate] = useState<SpecialDate | null>(null);

  useEffect(() => {
    const checkSpecialDates = () => {
      const today = new Date();
      const specialDate = SPECIAL_DATES.find(date => {
        const specialDay = new Date(today.getFullYear(), date.date.getMonth(), date.date.getDate());
        const diff = Math.abs(today.getTime() - specialDay.getTime());
        // Considerar como data especial se estiver dentro de 24 horas
        return diff <= 24 * 60 * 60 * 1000;
      });

      setActiveSpecialDate(specialDate || null);
    };

    checkSpecialDates();

    // Verificar a cada hora
    const interval = setInterval(checkSpecialDates, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    activeSpecialDate,
    isSpecialDay: !!activeSpecialDate,
  };
} 