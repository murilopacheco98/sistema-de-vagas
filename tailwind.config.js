/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      // => @media (min-width: 900px) { ... }
      'sm': '640px',
      'md': '780px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'md-lg': '900px',
    },
  },
  plugins: [],
}

