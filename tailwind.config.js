/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EBDDCE',
        },
        lavender: {
          50: '#F8F6FD',
          100: '#F3EEFB',
          200: '#E6DAF7',
          300: '#D5C1F0',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        coral: {
          50: '#FFF5F4',
          100: '#FFE9E6',
          500: '#FF6459',
          600: '#EA4C41',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        ink: {
          900: '#1E1B26',
          800: '#2C2738',
          700: '#433E51',
          500: '#6E6A7D',
          400: '#9B96A8',
        }
      },
      boxShadow: {
        'soft': '0 12px 32px -4px rgba(124, 58, 237, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 8px 24px -4px rgba(60, 48, 86, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'float': '0 20px 40px -10px rgba(124, 58, 237, 0.2)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}


