module.exports = {
    content: ["./src/app/*.{html,ts}", "./src/app/**/*.{html,ts}"],
    theme: {
        extend: {},
        fontFamily: {
            serif: ["Montserrat", "sans-serif"]
        }
    },
    plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")]
};
