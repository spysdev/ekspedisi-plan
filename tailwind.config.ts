// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(210, 80%, 55%)",
        secondary: "hsl(210, 30%, 40%)",
        accent: "hsl(40, 90%, 55%)",
        surface: "hsl(210, 20%, 97%)",
        "surface-dark": "hsl(210, 20%, 12%)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, hsl(210, 80%, 55%), hsl(40, 90%, 55%))",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0,0,0,0.1)"
      },
    },
  },
  plugins: [],
};

export default config;
