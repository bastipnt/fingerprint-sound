import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{html,ts,tsx}"],
  theme: {
    colors: {
      primary: "#83C0C1",
      secondary: "#6962AD",
      neutral: "#fff",
      surface: "#161A30",
    },
    extend: {
      gridTemplateRows: {
        layout: "1fr auto",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
