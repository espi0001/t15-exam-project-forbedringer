/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "20px",
        sm: "32px",
        lg: "48rem",
        xl: "64rem",
        "2xl": "96rem",
      },
    },
    extend: {
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        fadeIn: {
          '0%': { 
            opacity: '0' 
          },
          '100%': { 
            opacity: '1' 
          }
        }
      },
      animation: {
        'slide-up': 'slideUp 2.5s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards'
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      zIndex: {
        100: "100",
        1000: "1000",
        9999: "9999",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text_color: "#FFFFFF",
        white_color: "#FFFFFF",
        red_color: "#7d0200",
        'custom-start': '#060100',
        'custom-end': '#121212',
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        step_h1: "clamp(2.5rem, 2.1522rem + 1.7391vw, 3.5rem)",
        step_h2: "clamp(2.25rem, 1.9891rem + 1.3043vw, 3rem)",
        step_h3: "clamp(2rem, 1.8261rem + 0.8696vw, 2.5rem)",
        step_h4: "clamp(1.5rem, 1.1087rem + 1.9565vw, 2.625rem)",
        step_h5: "clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)",
        step_h6: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
        step_p: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};