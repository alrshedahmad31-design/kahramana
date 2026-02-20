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
        gold: "var(--color-gold)",
        saddle: "var(--color-saddle)",
        coffee: "var(--color-coffee)",
        walnut: "var(--color-walnut)",
        lace: "var(--text-body)",
        brand: {
          gold: "var(--color-gold)",
          saddle: "var(--color-saddle)",
          coffee: "var(--color-coffee)",
          walnut: "var(--color-walnut)",
        }
      },
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "sans-serif"],
        cairo: ["var(--font-primary)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "100": "var(--fs-100)",
        "200": "var(--fs-200)",
        "300": "var(--fs-300)",
        "400": "var(--fs-400)",
        "500": "var(--fs-500)",
        "600": "var(--fs-600)",
        "700": "var(--fs-700)",
        "800": "var(--fs-800)",
        "900": "var(--fs-900)",
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "7": "var(--space-7)",
        "8": "var(--space-8)",
        "9": "var(--space-9)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "14": "var(--space-14)",
        "16": "var(--space-16)",
        "safe-b": "env(safe-area-inset-bottom)",
      },
      borderWidth: {
        DEFAULT: "var(--border-thin)",
        "0": "0",
        "1": "var(--border-thin)",
        "2": "var(--border-thick)",
      },
      borderRadius: {
        "1": "var(--radius-1)",
        "2": "var(--radius-2)",
        "3": "var(--radius-3)",
        "4": "var(--radius-4)",
        "5": "var(--radius-5)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "pill": "var(--radius-pill)",
      },
      transitionDuration: {
        "1": "var(--dur-1)",
        "2": "var(--dur-2)",
        "3": "var(--dur-3)",
        "4": "var(--dur-4)",
      },
      transitionTimingFunction: {
        "in": "var(--ease-in)",
        "out": "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      zIndex: {
        "nav": "var(--z-nav)",
        "drawer": "var(--z-drawer)",
        "modal": "var(--z-modal)",
        "toast": "var(--z-toast)",
      },
      boxShadow: {
        "1": "var(--shadow-1)",
        "2": "var(--shadow-2)",
        "3": "var(--shadow-3)",
        "glow": "var(--glow-gold)",
        "gold": "var(--glow-gold)",
      },
      borderColor: {
        "subtle": "var(--border-subtle)",
      }
    },
  },
  plugins: [],
};

export default config;
