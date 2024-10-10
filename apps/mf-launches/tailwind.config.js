/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'graytext': '#777777',
        'gray75': '#757575',
        'grayc2': '#C2C2C2',
        'blue': '#4A85F6'
      }
    },
  },
  plugins: [],
}

