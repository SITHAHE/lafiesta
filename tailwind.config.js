/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080510',
        'ink-soft': '#100823',
        plum: '#1B0E34',
        grape: {
          50: '#F7EEFE',
          100: '#ECDBFD',
          200: '#DCC0F4',
          300: '#C9A0E8',
          400: '#B36FE0',
          500: '#9B3FD4',
          600: '#7A2BB8',
          700: '#5E1F95',
          800: '#3D1466',
          900: '#2A0E47',
        },
        magenta: '#D16BF0',
        orchid: '#E26FE0',
        silver: '#DBDBE6',
        champagne: '#F0D9A8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(209,107,240,0.55)',
        'glow-sm': '0 0 30px -8px rgba(209,107,240,0.5)',
        card: '0 24px 60px -20px rgba(0,0,0,0.7)',
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.7)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 26s linear infinite',
        'spin-slower': 'spin-slow 60s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 36s linear infinite',
        twinkle: 'twinkle 3.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
