/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenish: "#4EEA96",
        grayish: "#A0A0A0",
        whitish: "#F0F0F0"
      }
    },
  },
  plugins: [],
}