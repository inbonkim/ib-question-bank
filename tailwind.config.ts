import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ib: {
          blue: "#0F4C81",
          gold: "#D4AF37",
          dark: "#1E293B",
          accent: "#2563EB",
          light: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
