/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html"
  ],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      serif: ['"Fraunces"', 'Georgia', 'serif'],
    },
    extend: {
      fontSize: {
        'fluid-hero': 'clamp(2.15rem, 1.6rem + 2.4vw, 3.6rem)',
        'fluid-h2': 'clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem)',
        'fluid-h3': 'clamp(1.18rem, 1.05rem + 0.6vw, 1.5rem)',
        'fluid-lead': 'clamp(1.05rem, 0.96rem + 0.38vw, 1.25rem)',
        'fluid-body': 'clamp(0.975rem, 0.92rem + 0.25vw, 1.0625rem)',
        'fluid-sm': 'clamp(0.85rem, 0.8rem + 0.2vw, 0.925rem)',
        'fluid-xs': 'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
      },
      colors: {
        sage: {
          50: '#f4f7f5',
          100: '#e5ece7',
          200: '#ceddd2',
          300: '#abc4b3',
          400: '#83a58e',
          500: '#648870',
          600: '#4e6d57',
          700: '#3f5646',
          800: '#34463a',
          900: '#2c3a31',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        warm: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#eae0d2',
          300: '#dccab3',
          400: '#cbb092',
          500: '#bd9a77',
          600: '#ad8464',
          700: '#906b52',
          800: '#755745',
          900: '#60483a',
        },
        terracotta: {
          50: '#fdf6f2',
          100: '#faece4',
          500: '#d97745',
          600: '#c55f2c',
          700: '#a3481e',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(15, 118, 110, 0.07)',
        'card': '0 4px 20px -2px rgba(44, 58, 49, 0.05)',
        'hover': '0 20px 35px -5px rgba(15, 118, 110, 0.12)',
      }
    }
  },
  plugins: [],
}
