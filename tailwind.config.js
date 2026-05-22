/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dna-black': '#050505',
        'dna-dark': '#0a0a0c',
        'dna-purple': '#8b5cf6',
        'dna-blue': '#3b82f6',
        'dna-neon': '#00f2ff',
        'dna-toxic': '#adff2f',
      },
      fontFamily: {
        'esports': ['var(--font-orbitron)', 'sans-serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
        'hero-mesh': "radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)",
      },
      animation: {
        'glow-pulse': 'glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1.5) blur(10px)' },
          '50%': { opacity: 0.5, filter: 'brightness(1) blur(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
