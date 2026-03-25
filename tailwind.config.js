/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'handwritten': ['Brush Script MT', 'cursive'],
        'logo': ['LogoFont', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#1E3A8A',
      },
    },
  },
  plugins: [],
}
