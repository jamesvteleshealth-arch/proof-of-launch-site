import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#05080F",
          800: "#090E1A",
          700: "#0E1525",
          600: "#131C30",
        },
        ink: "#EFF6FF",
        teal: {
          DEFAULT: "#00D4AA",
          dim: "#009E80",
          bright: "#00F4C4",
        },
        amber: {
          DEFAULT: "#FFB800",
        },
        violet: {
          DEFAULT: "#8B5CF6",
        },
        green: {
          DEFAULT: "#10B981",
        },
        critical: "#FF4D4D",
        info: "#3B82F6",
        muted: {
          DEFAULT: "#3D5470",
          2: "#6B88A0",
        },
        "border-subtle": "#0F1E30",
        "border-visible": "#182840",
      },
      fontFamily: {
        display: ["var(--font-display)", "Barlow Condensed", "sans-serif"],
        body: ["var(--font-body)", "DM Sans", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        eyebrow: "0.18em",
      },
      backgroundImage: {
        "grid-overlay":
          "linear-gradient(to right, rgba(0,212,170,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,170,0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      keyframes: {
        "reveal-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "reveal-in": "reveal-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
