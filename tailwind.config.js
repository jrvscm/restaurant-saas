module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      clipPath: {
        ribbon: 'polygon(0 0, 100% 50%, 0 100%)'
      },
      backgroundImage: {
        'paper-texture': "url('//images.ctfassets.net/dho5s3z0t7k5/0z8Sw6prWk65vrMaXWdFw/e82e4fc5b3762ad161a872eccd8dba50/olga-thelavart-HZm2XR0whdw-unsplash.jpg')",
        'hero-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/4NMGvilLFqsQLLtLsNrKg6/27d2a971e5712bc687782898beadc22b/klara-kulikova-5eoiyhGLFb4-unsplash.jpg')",
        'menu-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/21zZ3F5jT2BqJg1zKaZNuJ/cd1946df5796f9d743dd80d07af22a43/ivan-torres-MQUqbmszGGM-unsplash.jpg')"
      },
      fontFamily: {
        logo: ['"Fredericka the Great"', 'serif']
      },
      colors: {
        background: 'hsl(45, 85%, 97%)', // Light Cream Background
        foreground: 'hsl(0, 0%, 15%)', // Dark Neutral for Text
        border: 'hsl(45, 85%, 80%)', // Subtle Gold Borders
        primary: {
          DEFAULT: 'hsl(10, 72%, 50%)', // Pizza Sauce Red
          foreground: 'hsl(0, 0%, 100%)' // White on Primary
        },
        secondary: {
          DEFAULT: 'hsl(45, 85%, 57%)', // Golden Crust Yellow
          foreground: 'hsl(0, 0%, 10%)' // Dark Text on Secondary
        },
        accent: {
          DEFAULT: 'hsl(120, 60%, 38%)', // Basil Green
          foreground: 'hsl(0, 0%, 100%)' // White on Accent
        },
        muted: {
          DEFAULT: 'hsl(0, 0%, 90%)', // Light Neutral
          foreground: 'hsl(0, 0%, 40%)' // Gray Text
        },
        destructive: {
          DEFAULT: 'hsl(0, 60%, 50%)', // Alerts and Errors
          foreground: 'hsl(0, 0%, 100%)'
        },
        card: {
          DEFAULT: 'hsl(45, 85%, 95%)', // Light Card Background
          foreground: 'hsl(0, 0%, 20%)' // Darker Card Text
        },
        sidebar: {
          DEFAULT: 'hsl(0, 0%, 10%)', // Dark Gray Sidebar
          foreground: 'hsl(0, 0%, 100%)', // White Text
          primary: 'hsl(10, 72%, 50%)', // Pizza Sauce Red
          'primary-foreground': 'hsl(0, 0%, 100%)',
          accent: 'hsl(45, 85%, 57%)', // Golden Yellow
          'accent-foreground': 'hsl(0, 0%, 10%)',
          border: 'hsl(0, 0%, 20%)',
          ring: 'hsl(0, 0%, 40%)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'slide-out-left': 'slide-out-left 0.3s ease-in',
        'fade-in': 'fade-in .35s ease-in',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
