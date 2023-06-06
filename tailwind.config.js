/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#BFED37',
                secondary: '#1A1C1E',
                tertiary: '#332461',
            },
        },
    },
    plugins: [],
};
