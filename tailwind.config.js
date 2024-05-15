/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        "3xl": "0px 3.17px 19.04px 0px rgba(189, 189, 189, 0.23)",
        discCard: "0px 4px 4px 0px rgba(174, 174, 174, 0.25)",
      },
      backdropBrightness: {
        25: ".25",
      },
      backgroundImage: {
        fundoAuth: 'url("src/assets/init_background.jpg")',
        fundoHome: 'url("src/assets/background-home.png")',
      },
      colors: {
        customYellow: "#FBBC05",
        sysmapLight: "#9EE2FF",
        lightGray: "#FAFAFF",
        header: "rgba(255, 255, 255, 0.3)",
        backgroundBlack: "#19181F",
        discCard: "rgba(255, 255, 255, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1320px",

        xxl: "1536px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
