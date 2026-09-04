/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          DEFAULT: '#4F46E5',
        },
        secondary: {
          500: '#06B6D4',
          600: '#0891B2',
          DEFAULT: '#06B6D4',
        },
        success: {
          500: '#10B981',
          600: '#059669',
          DEFAULT: '#10B981',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
          DEFAULT: '#F59E0B',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
          DEFAULT: '#EF4444',
        },
        slate: {
          850: '#151E2E',
          900: '#0F172A',
          950: '#020617',
        }
      },
    },
  },
  plugins: [],
};
