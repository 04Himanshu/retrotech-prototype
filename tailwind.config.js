/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',
          secondary: '#F7F7F5',
          tertiary: '#F0F0EE',
        },
        typography: {
          primary: '#171717',
          secondary: '#737373',
          muted: '#A3A3A3',
        },
        border: {
          subtle: '#E8E8E8',
          hover: '#D4D4D4',
        },
        brand: {
          DEFAULT: '#353788',
          dark: '#262863',
          light: '#4C4EB2',
          cyan: '#0096C7',
          amber: '#D97706',
          surface: '#F4F5FB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        editorial: '0.18em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
}
