/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueish: "#F0FCFF",
        orange: "#fafafa",
        redish: "#FDDADA",
        lightGray: "#616161"
      },
      boxShadow: {
        strong: "5px 4px 0px 0px #000;"
      },
      gridTemplateColumns: {
        fill: "repeat( auto-fill, minmax(200px, auto) )"
      }
    },
  },
  plugins: [],
}