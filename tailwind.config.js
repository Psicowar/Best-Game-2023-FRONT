/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "gridAutoFit": 'repeat(auto-fit, minmax(200px, 1fr))', 
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

