/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",

    ],
    theme: {
        extend: {
            backgroundImage: {
                'background': "url('../images/section-3-1.png')",
                // 'background2': "url('../images/bg3.jpg')",
            },
        }
    },
    plugins: [],
}
