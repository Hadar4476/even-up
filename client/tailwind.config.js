/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this includes your components
    "./node_modules/@mui/**/*.{js,ts,jsx,tsx}", // Include MUI components if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FFC107",
      },
    },
  },
  plugins: [],
};
