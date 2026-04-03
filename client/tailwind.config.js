/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "med-green": "#10B981", // Adjust this color based on the logo
      },
    },
  },
  plugins: [],
};
