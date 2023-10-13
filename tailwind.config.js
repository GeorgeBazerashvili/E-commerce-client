/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        js: "url(./src/assets/webps/js.webp)",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, 290px)",
      },
    },
  },
  plugins: [],
};
