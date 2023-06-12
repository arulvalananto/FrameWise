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
                chip: '#FFC850',
                place: '#6BE898',
                topic: '#CD92D8',
                mention: '#825A50',
                angry: '#E71E24',
                joy: '#48B83E',
                sad: '#1A61AF',
                suprised: '#FBE925',
                disgusted: '#612D91',
                fear: '#F6911F',
            },
            fontFamily: {
                raleway: ['Raleway', 'sans-serif'],
                cherry: ['Cherry Bomb One', 'cursive'],
            },
        },
    },
    plugins: [],
};
