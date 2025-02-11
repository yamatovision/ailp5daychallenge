import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#8B5CF6',    // メインの紫
        secondary: '#2DD4FF',  // アクセントの青
        gradient: {
          start: '#8B5CF6',
          mid: '#6366F1',
          end: '#2DD4FF'
        }
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite'
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #8B5CF610 1px, transparent 1px), linear-gradient(to bottom, #8B5CF610 1px, transparent 1px)',
        'crystal-pattern': 'radial-gradient(circle at center, #8B5CF605 0%, transparent 50%)'
      },
      backgroundSize: {
        'grid': '40px 40px'
      }
    },
  },
  plugins: [],
} satisfies Config;