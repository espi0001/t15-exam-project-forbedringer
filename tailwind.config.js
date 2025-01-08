/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* mellemrum, gap & spacing */
      margin: {
        mx_default: "20px",
        mx_lg: "64px",
      },
      padding: {
        py_default: "30px",
        py_lg: "60px",
      },
      utilities: {
        /* GSAP & Framer animationer, kendetegnet ved transform & keyframes */
        ".transition-base": {
          "@apply transition-all duration-1000 ease-in-out": {},
        },
      },
      fontFamily: {
        customFont: ['"PP Pangaia"', "sans-serif"],
      },
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-up": "slideUp 2.5s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "infinite-scroll": "infinite-scroll 15s linear infinite",
      },
      animationDelay: {
        200: "200ms",
        400: "400ms",
        600: "600ms",
        800: "800ms",
      } /* nye variabler til z-index */,
      zIndex: {
        100: "100",
        1000: "1000",
        9999: "9999",
      },
      colors: {
        /* colors er specielt brugt i buttons og genbrugte componenter */ background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text_color: "#fff",
        white_color: "#fff",
        black_color: "#121212",
        red_color: "#ff2800",
        less_black_color: "#262626",
        light_black_color: "#F3F4F6",
        "custom-start": "#000",
        "custom-end": "#121212",
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
      } /* font clamps & steps */,
      fontSize: {
        step_h1: "clamp(2.5rem, 2.1522rem + 1.7391vw, 3.5rem)",
        step_h2: "clamp(2.25rem, 1.9891rem + 1.3043vw, 3rem)",
        step_h3: "clamp(2rem, 1.8261rem + 0.8696vw, 2.5rem)",
        step_h4: "clamp(1.5rem, 1.3261rem + 0.8696vw, 2rem)",
        step_h5: "clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)",
        step_h6: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
        step_text_large: "clamp(1.25rem, 1.2065rem + 0.2174vw, 1.375rem)",
        step_p: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
        step_text_regular: "clamp(0.875rem, 0.8315rem + 0.2174vw, 1rem)",
        step_text_tiny: "clamp(0.75rem, 0.7065rem + 0.2174vw, 0.875rem)",
      } /* border */,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
