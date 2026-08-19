import re

css_content = """@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource/sora";
@import "@fontsource/plus-jakarta-sans";
@import "@fontsource/fraunces";
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    @apply font-sans;
  }

  body {
    background-color: var(--surface);
    color: var(--dark);
  }

  :root {
    --primary: #2563EB;
    --primary-foreground: #FFFFFF;
    
    --warm: #F59E0B;
    --success: #10B981;
    --accent: #8B5CF6;
    
    --surface: #FFFBF5;
    --dark: #1E1B4B;

    --background: var(--surface);
    --foreground: var(--dark);
    --card: #FFFFFF;
    --card-foreground: var(--dark);
    --popover: #FFFFFF;
    --popover-foreground: var(--dark);
    --secondary: #F3F4F6;
    --secondary-foreground: var(--dark);
    --muted: #F3F4F6;
    --muted-foreground: #6B7280;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: #E5E7EB;
    --input: #E5E7EB;
    --ring: var(--primary);
    --radius: 1rem;
  }
}

.gradient-warm {
  background: linear-gradient(135deg, var(--warm) 0%, var(--primary) 100%);
}
.gradient-photo-overlay {
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(30,27,75,0.8) 100%);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes pulse-soft {
  0% { opacity: 1; }
  50% { opacity: 0.8; }
  100% { opacity: 1; }
}
"""

with open('src/index.css', 'w') as f:
    f.write(css_content)

tailwind_config = """/** @type {import('tailwindcss').Config} */
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
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
        accent: ['"Fraunces"', 'serif']
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
"""

with open('tailwind.config.js', 'w') as f:
    f.write(tailwind_config)
