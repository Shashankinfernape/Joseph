/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        warm: "var(--warm)",
        success: "var(--success)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        dark: "var(--dark)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        brand: {
          'blue-500': 'var(--brand-blue-500)',
          'blue-600': 'var(--brand-blue-600)',
          'navy-900': 'var(--brand-navy-900)',
          'navy-800': 'var(--brand-navy-800)',
          'yellow-400': 'var(--brand-yellow-400)',
          'yellow-500': 'var(--brand-yellow-500)',
          'orange-500': 'var(--brand-orange-500)',
          'coral-500': 'var(--brand-coral-500)',
          'green-500': 'var(--brand-green-500)',
          'surface': 'var(--brand-surface)',
          'surface-blue': 'var(--brand-surface-blue)',
          'surface-yellow': 'var(--brand-surface-yellow)',
          'surface-green': 'var(--brand-surface-green)',
          'surface-dark': 'var(--brand-surface-dark)',
          'text-primary': 'var(--brand-text-primary)',
          'text-secondary': 'var(--brand-text-secondary)',
          'text-muted': 'var(--brand-text-muted)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        montserrat: ['"Montserrat"', '"Avenir Next"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
        accent: ['"Fraunces"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif']
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
