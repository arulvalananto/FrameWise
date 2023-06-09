/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#BFED37',
                secondary: '#1A1C1E',
                tertiary: '#332461',
                darkgrey: '#1B1D1E',
                'light-secondary': '#1A1C1E01',
                input: '#999999',
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                cherry: ['Cherry Bomb One', 'cursive'],
            },
        },
    },
    plugins: [],
};
