/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "serif"],
        jetbrains: ["jetbrains", "mono"],
      },
      colors: {
        "github": "#0d1117",
        "accent": "1e91ea",
      },
      backgroundImage: {
        "radial": "radial-gradient(var(--tw-gradient-stops))",
        "rainforest-light": "linear-gradient(to right bottom, rgba(215, 230, 220, 0.92), rgba(215, 210, 220, 0.93)), url('/assets/rainforest-hiva.jpg')",
        "rainforest-dark": "linear-gradient(to right bottom, rgba(30, 20, 30, 0.9), rgba(20, 30, 30, 0.9)), url('/assets/rainforest-hiva.jpg')",
        "sea-light": "linear-gradient(to right bottom, rgba(226, 229, 245, 0.91), rgba(210, 210, 240, 0.93)), url('/assets/sea.jpg')",
        "sea-dark": "linear-gradient(to right bottom, rgba(20, 20, 30, 0.9), rgba(30, 30, 40, 0.9)), url('/assets/sea.jpg')",
      },
      dropShadow: {
        "dark": "0 15px 15px rgba(40, 40, 40, 1.0)",
        "light": "0 10px 10px rgba(255, 255, 255, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)"
        ]
      },
    },
  },
  plugins: [],
}
