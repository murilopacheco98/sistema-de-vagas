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
    boxShadow: {
      "3xl": "0px 5px 20px 0px rgba(0, 0, 0, 0.3)",
      "4xl": "0px 0px 40px 5px rgba(0, 0, 0, 0.3)",
    },
  },
  plugins: [],
}

