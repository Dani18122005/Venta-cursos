module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  safelist: ['bg-red-500', 'text-xl'], // Lista de clases que nunca deben purgarse
  theme: {
    extend: {},
  },
  plugins: [],
};
