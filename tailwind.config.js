/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        starcartoon: ['StarCartoon', 'sans-serif'], // <-- Ajoutez cette ligne
      },
    },
  },
  plugins: [],
};