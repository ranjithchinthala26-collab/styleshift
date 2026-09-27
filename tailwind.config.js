/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#05070F",
        foreground: "#FFFFFF",
        primary: {
          cyan: "#22D3EE",
          violet: "#A78BFA",
          purple: "#C084FC",
        },
        surface: {
          darkest: "#020617",
          dark: "#05070F",
          card: "#111827",
          subtle: "#0A0F1C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "float": "float 18s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.2s infinite",
        "orb-float": "hero-orb-float 10s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-36px) rotate(4deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34, 211, 238, 0.5)" },
          "70%": { boxShadow: "0 0 0 18px rgba(34, 211, 238, 0)" },
        },
        "hero-orb-float": {
          "0%": { transform: "translate3d(-15%, -10%, 0) scale(1)" },
          "50%": { transform: "translate3d(5%, 5%, 0) scale(1.12)" },
          "100%": { transform: "translate3d(-5%, 8%, 0) scale(0.94)" },
        },
      },
    },
  },
  plugins: [],
};
