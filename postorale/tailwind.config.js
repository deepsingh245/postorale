/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Scan Angular files
    "./node_modules/primeng/**/*.{js,ts}", // Optional: enable Tailwind purge in PrimeNG
    "./node_modules/primeicons/**/*.{js,ts}", // Optional: icons if customized with Tailwind
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc. here if needed
    },
  },
  plugins: [PrimeUI],
};
