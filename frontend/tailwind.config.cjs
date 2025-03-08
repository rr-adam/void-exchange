/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 1s ease-in forwards',
      },
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  daisyui: {
    themes: [
      {
        "void": {
          "primary": "#f43f5e",
          "secondary": "#2364AA",
          "accent": "#3DA5D9",
          "neutral": "#f43f5e",
          "base-100": "#FFFFFF",
          "info": "#bfdbfe", 
          "success": "#bbf7d0",
          "warning": "#fef3c7",
          "error": "#fecdd3",
        }
      },
    ]
  },
  plugins: [require("daisyui")],
};