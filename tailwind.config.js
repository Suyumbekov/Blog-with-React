/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EBEEF3",
        primary: "#1890FF",
        name: "rgba(0, 0, 0, 0.85)",
        counter: "rgba(0, 0, 0, 0.75)",
        tag: "rgba(0, 0, 0, 0.50)",
      },
    },
  },
  plugins: [],
};
