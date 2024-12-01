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
                darkPinkTransp: "rgba(219, 39, 119, 0.3)",
                modal: "rgba(0, 0, 0, 0.3)",
            },
            backgroundImage: {
                "hero-pattern": "url('src/assets/grid.png')",
            },
            borderColor: {
                darkPink: "rgb(219, 39, 119)",
            },
            boxShadow: {
                main: "0px 0px 8px -4px rgba(66, 68, 90, 1)",
            },
        },
    },
    plugins: [],
};
