import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neon: {
          pink: "#ff00a0",
          cyan: "#00f0ff",
          purple: "#8b5cf6",
          orange: "#ff6b35",
        },
        cyber: {
          bg: "#050508",
          "bg-2": "#0a0a12",
          card: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.08)",
          glass: "rgba(255,255,255,0.05)",
        },
      },
      fontFamily: {
        sans: ["Inter", "PingFang SC", "Microsoft YaHei", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        glitch: "glitch 3s infinite linear alternate-reverse",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%": { clipPath: "inset(20px 0 30px 0)" },
          "20%": { clipPath: "inset(60px 0 80px 0)" },
          "40%": { clipPath: "inset(10px 0 50px 0)" },
          "60%": { clipPath: "inset(80px 0 100px 0)" },
          "80%": { clipPath: "inset(40px 0 70px 0)" },
          "100%": { clipPath: "inset(90px 0 110px 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
