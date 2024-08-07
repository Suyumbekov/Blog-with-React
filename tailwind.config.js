/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      colors: {
        background: "#EBEEF3",
        primary: "#1890FF",
        name: "rgba(0, 0, 0, 0.85)",
        counter: "rgba(0, 0, 0, 0.75)",
        tag: "rgba(0, 0, 0, 0.50)",
        account: "#262626",
        placeholder: "#BFBFBF",
        highlight: "#F5222D",
        check: "#595959",
        article: "#52C41A",
      },
    },
  },
  plugins: [],
};
