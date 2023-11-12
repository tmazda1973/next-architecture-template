/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{sass,scss,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        notojp: ['Noto Sans JP'],
      },
    },
  },
  plugins: [],
};
