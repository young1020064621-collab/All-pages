/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5A623',
          50: '#FEF9E7',
          100: '#FDF3CF',
          200: '#FCE89F',
          300: '#FADC6F',
          400: '#F8D03F',
          500: '#F5A623',
          600: '#D4910F',
          700: '#A4700C',
          800: '#745008',
          900: '#443005',
        },
      },
    },
  },
  plugins: [],
};
