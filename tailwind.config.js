/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e7',
          100: '#fde1bf',
          200: '#fbcd97',
          300: '#f9b96f',
          400: '#f7a547',
          500: '#f5911f',
          600: '#c47419',
          700: '#935713',
          800: '#623a0d',
          900: '#311d06',
        },
        secondary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c1d7ff',
          300: '#a2c3ff',
          400: '#83afff',
          500: '#649bff',
          600: '#507ccc',
          700: '#3c5d99',
          800: '#283e66',
          900: '#141f33',
        },
      },
    },
  },
  plugins: [],
}
