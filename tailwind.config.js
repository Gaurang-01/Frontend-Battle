/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyber-Slate Glassmorphism Design Tokens
        canvas: '#172836',           // Oceanic Noir – Application Canvas Background
        glass: '#114C5A',            // Nocturnal Expedition – Glass Plate Blends / Dark Overlays
        arctic: '#F1F6F4',           // Arctic Powder – Primary Text / Crisp Accents
        mint: '#D9E8E2',             // Mystic Mint – Subtle Borders / Frosted Tint Highlights
        forsythia: '#FFC801',        // Forsythia – High-Value Accent / Primary UI Highlights
        saffron: '#FF9932',          // Deep Saffron – Dynamic Callouts / Featured Alerts
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '20px',
        xl: '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scan': 'scan 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 200, 1, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 200, 1, 0.6), 0 0 80px rgba(255, 153, 50, 0.2)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(209, 232, 226, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 232, 226, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
