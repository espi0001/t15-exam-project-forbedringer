/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text_color: "#FFFFFF",
      },
      fontSize: {
        step_h1: "clamp(2.5rem, 2.1522rem + 1.7391vw, 3.5rem)",
        step_h2: "clamp(2.25rem, 1.9891rem + 1.3043vw, 3rem)",
        step_h3: "clamp(2rem, 1.8261rem + 0.8696vw, 2.5rem)",
        step_h4: "clamp(1.5rem, 1.1087rem + 1.9565vw, 2.625rem)",
        step_h5: "clamp(1.25rem, 1.163rem + 0.4348vw, 1.5rem)",
        step_h6: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
      },
    },
  },
  plugins: [],
};
