/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif',
      },
      colors: {
        primary: {
          DEFAULT: '#468966',
          100: '#dae7e0',
          200: '#b5d0c2',
          300: '#90b8a3',
          400: '#6ba185',
          500: '#468966',
          600: '#386e52',
          700: '#2a523d',
          800: '#1c3729',
          900: '#0e1b14',
        },
        secondary: {
          DEFAULT: '#FFB03B',
          100: '#ffefd8',
          200: '#ffdfb1',
          300: '#ffd089',
          400: '#ffc062',
          500: '#ffb03b',
          600: '#cc8d2f',
          700: '#996a23',
          800: '#664618',
          900: '#33230c',
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#468966',
          secondary: '#FFB03B',
          accent: '#efd38d',
          neutral: '#221F2E',
          'base-100': '#FFB03B',
          info: '#B64926',
          success: '#70EBBC',
          warning: '#F0BB60',
          error: '#E52A4F',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
