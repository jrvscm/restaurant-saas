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
      backgroundImage: {
        // Add gradient overlay to hero image
        'hero-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/4NMGvilLFqsQLLtLsNrKg6/27d2a971e5712bc687782898beadc22b/klara-kulikova-5eoiyhGLFb4-unsplash.jpg')",
        'menu-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/21zZ3F5jT2BqJg1zKaZNuJ/cd1946df5796f9d743dd80d07af22a43/ivan-torres-MQUqbmszGGM-unsplash.jpg')"
      },
      fontFamily: {
        logo: ['"Fredericka the Great"', 'serif'] // Add your Google Font here
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(10, 72%, 50%)', // Updated to match #D63920 (Bright red)
          foreground: 'hsl(0, 0%, 100%)' // White text on primary
        },
        secondary: {
          DEFAULT: 'hsl(45, 85%, 80%)', // Updated to match #F4DCAE (Beige)
          foreground: 'hsl(0, 0%, 10%)' // Dark text on secondary
        },
        destructive: {
          DEFAULT: 'hsl(0, 60%, 50%)', // Use for alerts (unchanged if not needed)
          foreground: 'hsl(0, 0%, 100%)'
        },
        muted: {
          DEFAULT: 'hsl(240, 10%, 90%)', // Light neutral tone
          foreground: 'hsl(240, 10%, 30%)'
        },
        accent: {
          DEFAULT: 'hsl(10, 72%, 40%)', // Darker red for accents
          foreground: 'hsl(0, 0%, 100%)'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(240, 10%, 95%)', // Neutral light background
          foreground: 'hsl(240, 10%, 20%)'
        },
        sidebar: {
          DEFAULT: 'hsl(0, 0%, 10%)', // Dark gray
          foreground: 'hsl(0, 0%, 100%)', // White text
          primary: 'hsl(10, 72%, 50%)',
          'primary-foreground': 'hsl(0, 0%, 100%)',
          accent: 'hsl(45, 85%, 80%)',
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
