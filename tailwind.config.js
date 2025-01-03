const { fontFamily } = require('tailwindcss/defaultTheme');

function generateOpacityVariants(baseColor) {
  const opacityVariants = {};
  for (let i = 5; i <= 95; i += 5) {
    opacityVariants[i] = `hsla(var(${baseColor}), ${i / 100})`; // Use `hsla` for opacity
  }
  return opacityVariants;
}

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
      colors: {
        confirmed: 'hsla(124, 50%, 11%,.5)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ...generateOpacityVariants('--primary')
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          ...generateOpacityVariants('--secondary')
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          ...generateOpacityVariants('--destructive')
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          ...generateOpacityVariants('--muted')
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          ...generateOpacityVariants('--accent')
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          ...generateOpacityVariants('--card')
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
          ...generateOpacityVariants('--popover')
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
          ...generateOpacityVariants('--sidebar-background')
        }
      },
      fontFamily: {
        sans: ['Lato', ...fontFamily.sans],
        logo: ['"Fredericka the Great"', 'serif']
      },
      backgroundImage: {
        'rewards-image':
          "url('//images.ctfassets.net/dho5s3z0t7k5/6cGKHhsyrkWQR71LAuMjAW/0fdb2cec42b2e08de8958e9e0bb37632/nik-owens-40OJLYVWeeM-unsplash__1_.jpg')",
        'paper-texture':
          "url('//images.ctfassets.net/dho5s3z0t7k5/0z8Sw6prWk65vrMaXWdFw/e82e4fc5b3762ad161a872eccd8dba50/olga-thelavart-HZm2XR0whdw-unsplash.jpg')",
        'hero-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/4NMGvilLFqsQLLtLsNrKg6/27d2a971e5712bc687782898beadc22b/klara-kulikova-5eoiyhGLFb4-unsplash.jpg')",
        'menu-image':
          "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url('//images.ctfassets.net/dho5s3z0t7k5/21zZ3F5jT2BqJg1zKaZNuJ/cd1946df5796f9d743dd80d07af22a43/ivan-torres-MQUqbmszGGM-unsplash.jpg')"
      },
      clipPath: {
        ribbon: 'polygon(0 0, 100% 50%, 0 100%)'
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
