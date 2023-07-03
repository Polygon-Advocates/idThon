/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#006A6A",
          secondary: "#4A6363",
          accent: "#4B607C",
          neutral: "#000", // Font color
          "base-100": "#F7FAF9", // Surface
          info: "#3498db",
          success: "#007A7A",
          error: "#BA1A1A",
        },
        dark: {
          secondary: "#4CDADA",
          primary: "#B0CCCB",
          accent: "#B3C8E9",
          neutral: "#C4C7C6",
          "base-100": "#101414",
          info: "#3498db",
          success: "#007A7A",
          error: "#FFB4AB",
        },
        water: {
          primary: "#3F88DE",
          secondary: "#575E71",
          accent: "#715573",
          neutral: "#1B1B1F", // Font Color
          "base-100": "#FAF8FD", // Surface
          info: "#3498db",
          success: "#007A7A",
          error: "#BA1A1A",
        },
        earth: {
          primary: "#74564A",
          secondary: "#775651",
          accent: "#6F5C2E",
          neutral: "#201A19", // Font Color
          "base-100": "#FFF8F6", // Surface
          info: "#3498db",
          success: "#007A7A",
          error: "#BA1A1A",
        },
        fire: {
          primary: "#A82D26",
          secondary: "#775652",
          accent: "#715B2E",
          neutral: "#201A19", // Font Color
          "base-100": "#FFF8F7", // Surface
          info: "#3498db",
          success: "#007A7A",
          error: "#BA1A1A",
        },
        air: {
          primary: "#F4B53F",
          secondary: "#7E5700",
          accent: "#6E5C40",
          neutral: "#1F1B16", // Font Color
          "base-100": "#FFF8F3", // Surface
          info: "#3498db",
          success: "#007A7A",
          error: "#BA1A1A",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
