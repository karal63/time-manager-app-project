/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mainColor: "var(--mainColor)",
                mainBackground: "var(--mainBackground)",
                mainHoverColor: "var(--mainHoverColor)",
                mainLineColor: "var(--mainLineColor)",
                mainDullColor: "var(--mainDullColor)",

                lightGray: "var(--lightGray)",
                selectedAchieve: "var(--selectedAchieve)",

                redBgNote: "var(--redBgNote)",
                greenBgNote: "var(--greenBgNote)",
                bgNote: "var(--bgNote)",
                notesDivide: "var(--notesDivide)",
                todayNoteColor: "var(--todayNoteColor)",
                dateFieldColor: "var(--dateFieldColor)",

                disabledBtn: "var(--disabledBtn)",

                timeIndicator: "var(--timeIndicator)",
                timeAxis: "var(--timeAxis)",
            },
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
