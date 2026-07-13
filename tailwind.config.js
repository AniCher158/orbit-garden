/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070918', panel: '#11152b', cream: '#f5f2e9', mint: '#8edbc7', violet: '#a89af9', coral: '#ff9c7f'
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
      boxShadow: { glow: '0 0 60px rgba(142,219,199,.15)' },
    },
  },
  plugins: [],
};
