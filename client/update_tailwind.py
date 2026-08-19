import re

with open('tailwind.config.js', 'r') as f:
    content = f.read()

# Replace the extend.colors and extend.borderRadius
# This is a bit tricky to regex without breaking it, so I will overwrite the whole tailwind.config.js
new_config = """/** @type {import('tailwindcss').Config} */
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
          foreground: "var(--on-primary)",
          container: "var(--primary-container)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--on-secondary)",
          container: "var(--secondary-container)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          dim: "var(--surface-dim)",
          container: "var(--surface-container)",
          containerHigh: "var(--surface-container-high)",
          on: "var(--on-surface)",
          variant: "var(--on-surface-variant)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        }
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
        'elevation-4': 'var(--elevation-4)',
        'elevation-5': 'var(--elevation-5)',
      },
      borderRadius: {
        lg: "var(--radius-large)",
        md: "var(--radius-medium)",
        sm: "var(--radius-small)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)"
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',
        'space-7': 'var(--space-7)',
        'space-8': 'var(--space-8)',
        'space-9': 'var(--space-9)',
        'space-10': 'var(--space-10)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
"""

with open('tailwind.config.js', 'w') as f:
    f.write(new_config)
