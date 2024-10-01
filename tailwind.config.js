/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        darkPink: "rgb(219, 39, 119)",
      },
      backgroundColor: {
        darkPink: "rgb(219, 39, 119)",
        darkPinkTransp: "rgba(219, 39, 119, 0.5)",
        modal: "rgba(0, 0, 0, 0.3)",
      },
      borderColor: {
        darkPink: "rgb(219, 39, 119)",
      },
    },
  },
  plugins: [],
};
