/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tardis: {
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
          accent: 'var(--accent-color)',
          background: 'var(--background-color)',
          text: 'var(--text-color)',
        },
      },
      animation: {
        'materialize': 'materialize 0.3s ease-out forwards',
        'glow': 'glow 2s infinite',
      },
      keyframes: {
        materialize: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px var(--accent-color)',
          },
          '50%': {
            boxShadow: '0 0 20px var(--accent-color)',
          },
        },
      },
    },
  },
  plugins: [],
} 