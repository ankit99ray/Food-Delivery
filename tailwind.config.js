/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: {
        'custom-left': 'calc(10% + 36px)',
        'custom-right': 'calc(10% + 36px)',
      }
    },
  },
  plugins: [],
}

