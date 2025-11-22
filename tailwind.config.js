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
      keyframes: {
        shoot: {
          "0%": { transform: "translateX(-80px)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateX(300px)", opacity: "0" },
        },
        warp: {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "30%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scaleX(3)" },
        },
        flash: {
          "0%": { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
          "100%": {
            transform: "translate(-50%,-50%) scale(100)",
            opacity: "0",
          },
        },
      },
      animation: {
        shoot: "shoot 0.6s linear forwards",
        warp: "warp 0.8s ease-out forwards",
        flash: "flash 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
