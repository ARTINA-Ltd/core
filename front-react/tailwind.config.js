/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
      extend: {
          backgroundImage: {
              'background': "url('/src/LoginComponent/images/bg2.jpg')",
              'background2': "url('/src/LoginComponent/images/bg3.jpg')",
          },
      }
  },
  plugins: [],
}
