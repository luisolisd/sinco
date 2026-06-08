import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f5f2eb',
          dark: '#ede9e0',
          darker: '#ddd9d0',
        },
        teal: {
          DEFAULT: '#1a7a8a',
          dark: '#155f6d',
          light: '#22a0b4',
          50: '#e8f6f8',
          100: '#c5eaef',
          200: '#8dd5e0',
          300: '#55bfce',
        },
        navy: {
          DEFAULT: '#2c3e50',
          light: '#3d5166',
          dark: '#1e2d3d',
        },
        sinco: {
          dark: '#1a1a1a',
          muted: '#6b7280',
        },
      },
      fontFamily: {
        heading: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
