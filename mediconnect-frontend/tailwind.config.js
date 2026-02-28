/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e5ff',
          200: '#bcd2ff',
          300: '#8eb5ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1a45f5',
          700: '#1333e1',
          800: '#162cb6',
          900: '#182a8f',
          950: '#131c57',
        },
        secondary: {
          50: '#effefb',
          100: '#c8fff4',
          200: '#91feea',
          300: '#52f5dc',
          400: '#1ee0c8',
          500: '#06c4af',
          600: '#029e8f',
          700: '#077e74',
          800: '#0b645d',
          900: '#0e524d',
          950: '#003330',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 20px rgba(51, 102, 255, 0.15)',
        'glow-lg': '0 0 40px rgba(51, 102, 255, 0.2)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
        'card-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 8px 20px -8px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(51,102,255,0.12), transparent)',
        'hero-mesh': 'radial-gradient(at 27% 37%, rgba(51,102,255,0.08) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(6,196,175,0.06) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(51,102,255,0.04) 0px, transparent 50%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'badge-glow': 'linear-gradient(135deg, rgba(51,102,255,0.1) 0%, rgba(6,196,175,0.1) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-in': 'scaleIn 0.4s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'border-flow': 'borderFlow 4s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(51, 102, 255, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(51, 102, 255, 0.25)' },
        },
        borderFlow: {
          '0%, 100%': { borderColor: 'rgba(51,102,255,0.3)' },
          '50%': { borderColor: 'rgba(6,196,175,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
