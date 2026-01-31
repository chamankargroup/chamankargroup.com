/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Organic Flow Color Palette
        sand: {
          DEFAULT: '#e8ddd4',
          light: '#f5f1ec',
          dark: '#d4c4b0',
        },
        clay: {
          DEFAULT: '#c4936a',
          light: '#d4a87d',
          dark: '#a67b52',
        },
        sage: {
          DEFAULT: '#a8b5a0',
          light: '#c4cfbe',
          dark: '#8a9b80',
        },
        earth: {
          DEFAULT: '#5c524a',
          light: '#7a6f65',
          dark: '#3d3630',
        },
        // Text colors
        'text-dark': '#2e2a26',
        'text-medium': '#5a544e',
        'text-light': '#8a847e',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
