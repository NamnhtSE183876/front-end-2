/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/picture/1341850.png')",
        'section-pattern': "url('/src/assets/picture/pxfuel.jpg')",
        'login-pattern': "url('/src/asscets/picture/508772.jpg')",
      }
    },
  },
  plugins: [],
};
