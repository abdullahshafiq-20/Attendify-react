/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
      colors:
      {
        colorScheme: 'var(--colorScheme)',
        bgcolor: 'var(--bgcolor)',
        borderColr: 'var(--borderColr)',
        textColor: 'var(--textColor)',
        hoverColor: 'var(--HoverColor)',
      }
  },
  plugins: [],

}