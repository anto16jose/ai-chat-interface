/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#f8faff', // Main Background
          secondary: '#f1f5f9', // Secondary Background
          card: '#ffffff', // Card/Panel Background
        },
        primary: {
          DEFAULT: '#3b82f6', // Primary Blue
          hover: '#2563eb', // Button Hover
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // Secondary Purple
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
          white: '#ffffff',
        },
        border: {
          input: '#e2e8f0',
          focus: '#3b82f6',
        },
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'button-gradient': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'background-accent': 'linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)',
      },
    },
  },
  plugins: [],
} 