import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        "blood-ink": "var(--blood-ink)",
        "hb-muted": "var(--hb-muted)",
        "luxury-gold": "var(--luxury-gold)",
        "hb-black": "#0D0D0D",
        "hb-white": "#F0EAE4",
        "hb-red": "#8B1A1A",
        "hb-gold": "#3D2B2B",
        "hb-gray": "#1C0A0A",
        "hb-border": "#3D2B2B",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        editorial: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
        product: ["var(--font-inter)", "system-ui", "sans-serif"],
        "brand-serif": ["var(--font-cinzel)", "Georgia", "serif"],
      },
      backgroundImage: {
        "card-well":
          "radial-gradient(circle at 50% 45%, var(--blood-ink) 0%, var(--void) 72%, var(--void) 100%)",
      },
      animation: {
        glitch: "glitch 4s infinite",
        marquee: "marquee 20s linear infinite",
        ticker: "ticker 15s linear infinite",
        revealUp: "revealUp 1s cubic-bezier(0.77,0,0.18,1) 0.1s both",
        linegrow: "linegrow 1s ease forwards",
        loadbar: "loadbar 1.8s cubic-bezier(0.77,0,0.18,1) forwards",
        fadeCorner: "fadeCorner 0.5s ease 0.6s forwards",
        splashGlitch: "splashGlitch 4s ease-in-out infinite",
        popIn: "popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        popIn: {
          from: { transform: "scale(0)" },
          to: { transform: "scale(1)" },
        },
        revealUp: {
          from: {
            clipPath: "polygon(0 100%,100% 100%,100% 100%,0 100%)",
          },
          to: { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" },
        },
        linegrow: {
          to: { transform: "scaleX(1)" },
        },
        loadbar: {
          to: { width: "100%" },
        },
        fadeCorner: {
          to: { opacity: "1" },
        },
        splashGlitch: {
          "0%,88%,100%": { transform: "none" },
          "90%": { transform: "skewX(-0.5deg)" },
          "92%": { transform: "skewX(0.5deg)" },
          "94%": { transform: "none" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": {
            transform: "translate(-2px, 1px)",
            filter: "hue-rotate(90deg)",
          },
          "94%": {
            transform: "translate(2px, -1px)",
            filter: "hue-rotate(-90deg)",
          },
          "96%": { transform: "translate(-1px, 2px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
