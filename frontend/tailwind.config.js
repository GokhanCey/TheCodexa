/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0A',
        primary: '#8B5CF6', // Violet
        secondary: '#06B6D4', // Cyan
        text: '#E5E5E5',
        muted: '#A3A3A3',
        border: '#262626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a2a2a 0deg, #050505 180deg, #2a2a2a 360deg)',
      },
    },
  },
  plugins: [],
}
