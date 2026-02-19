import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./i18n/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        gold: "var(--brand-gold)",
        saddle: "var(--brand-spice)",
        coffee: "var(--bg-primary)",
        walnut: "var(--bg-secondary)",
        lace: "var(--text-body)",
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "sans-serif"],
        cairo: ["Cairo", "system-ui", "sans-serif"],
      },
      spacing: {
        "safe-b": "env(safe-area-inset-bottom)",
      },
      height: {
        hero: "360px",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.08), 0 1px 1px rgba(0,0,0,.04)",
        float: "0 6px 16px rgba(0,0,0,.10)",
        sheet: "0 16px 40px rgba(0,0,0,.16)",
      },
    },
  },
  plugins: [],
};

export default config;
