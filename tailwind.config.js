/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                netflixRed: '#e50914',
                netflixBg: '#141414',
                netflixCard: '#1f1f1f',
                netflixText: '#ffffff',
            },
        },
    },
    plugins: [],
};
