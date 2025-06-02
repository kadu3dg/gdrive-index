export const themes = {
  tardis: {
    primary: '#003B6F',
    secondary: '#00204A',
    accent: '#FFD700',
    background: '#001B3F',
    text: '#FFFFFF',
    border: '#004B8D',
  },
  gallifrey: {
    primary: '#8B0000',
    secondary: '#4A0404',
    accent: '#FFD700',
    background: '#2B0000',
    text: '#FFFFFF',
    border: '#CC0000',
  },
  classic: {
    primary: '#4A4A4A',
    secondary: '#2B2B2B',
    accent: '#FFFFFF',
    background: '#000000',
    text: '#FFFFFF',
    border: '#666666',
  },
  newWho: {
    primary: '#1E90FF',
    secondary: '#0066CC',
    accent: '#FFD700',
    background: '#000033',
    text: '#FFFFFF',
    border: '#4169E1',
  },
};

export const animations = {
  tardisVortex: `
    @keyframes tardisVortex {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }
  `,
  regeneration: `
    @keyframes regeneration {
      0% { filter: brightness(1) blur(0); }
      50% { filter: brightness(2) blur(4px); }
      100% { filter: brightness(1) blur(0); }
    }
  `,
  materialize: `
    @keyframes materialize {
      0% { opacity: 0; transform: scale(0.8); filter: blur(8px); }
      50% { opacity: 0.5; transform: scale(1.1); filter: blur(4px); }
      100% { opacity: 1; transform: scale(1); filter: blur(0); }
    }
  `,
  sonicScan: `
    @keyframes sonicScan {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 255, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }
    }
  `,
}; 