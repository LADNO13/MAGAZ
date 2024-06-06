/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "426px",
      sm: "600px",  
      md: "800px",
      bb: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    }
  },
  plugins: [],
};
