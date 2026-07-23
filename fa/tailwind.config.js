/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // MUI ships its own reset (CssBaseline), so we turn Tailwind's off
  // to stop the two fighting over margins/box-sizing.
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        bg: '#09090B',
        surface: '#18181B',
        ink: '#FAFAFA',
        accent: {
          blue: '#3B82F6',
          violet: '#8B5CF6',
          cyan: '#06B6D4'
        }
      },
      borderRadius: {
        panel: '16px'
      },
      transitionDuration: {
        200: '200ms'
      },
      backdropBlur: {
        panel: '20px'
      },
      boxShadow: {
        panel: '0 8px 30px rgba(0, 0, 0, 0.25)',
        glow: '0 0 0 1px rgba(59, 130, 246, 0.45), 0 0 26px rgba(59, 130, 246, 0.3), 0 0 46px rgba(139, 92, 246, 0.12)'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(6%, -8%) scale(1.15)' }
        }
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
