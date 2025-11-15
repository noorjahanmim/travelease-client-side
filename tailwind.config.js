/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2563eb",
          secondary: "#14b8a6",
          accent: "#fbbf24",
          neutral: "#f5f5f5",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "text-base": "#1f2937",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#3b82f6",
          secondary: "#14b8a6",
          accent: "#fbbf24",
          neutral: "#1f2937",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "text-base": "#f9fafb",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
