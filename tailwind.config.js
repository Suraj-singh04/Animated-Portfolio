/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: "#0a0a12",
        bg2: "#12121f",
        bg3: "#0d1a2d",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glow: "0 0 35px rgba(99,102,241,0.35)",
      },

      /* 🚀 Required for InfiniteMenu */
      keyframes: {
        menuRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        menuFade: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flashPulse: {
          "0%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
          "100%": {
            transform: "translate(-50%, -50%) scale(100)",
            opacity: "0",
          },
        },
        warpLine: {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "30%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scaleX(3)" },
        },
      },
      animation: {
        menuRotate: "menuRotate 12s linear infinite",
        menuFade: "menuFade 0.45s ease forwards",
        flashPulse: "flashPulse 0.9s ease-out forwards",
        warpLine: "warpLine 0.9s ease-out forwards",
      },
    },
  },
  plugins: [],
};
