/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec4895',       
        secondary: '#a78bfa',    
        dark: {
          900: '#0F0F23',
          800: '#1A1A2E',
          700: '#16213E',
        },
        light: {
          900: '#F1F5F9',
          800: '#CBD5E1',
          700: '#94A3B8',
          600: '#64748B',
        },
      },
      backgroundImage: {
        'midnight-gradient': 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}