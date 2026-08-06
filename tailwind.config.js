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
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        'ibm-mono': ['IBM Plex Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        papel: {
          DEFAULT: '#FAF7F0',
          dark: '#F5F0E6',
          light: '#FFFCF5',
        },
        tinta: {
          DEFAULT: '#1A1A2E',
          light: '#2D2D44',
          soft: '#4A4A6A',
        },
        oro: {
          DEFAULT: '#C9A84C',
          light: '#DDBF5C',
          dark: '#A8883A',
        },
        sello: {
          verde: '#2D6A4F',
          rojo: '#9B2226',
          dorado: '#C9A84C',
        },
      },
    },
  },
  plugins: [],
}
