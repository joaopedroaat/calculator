/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "pink-100": "#FFE5EC",
      "pink-200": "#FFC2D1",
      "pink-300": "#FFB3C6",
      "pink-400": "#FF8FAB",
      "pink-500": "#FB6F92",
    },
    extend: {
      fontFamily: {
        display: ["Calculator"],
      },
    },
  },
  plugins: [],
};
