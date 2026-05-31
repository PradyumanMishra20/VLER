import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F0F10",
          elevated: "#161616",
          surface: "#1B1B1B",
        },
        foreground: {
          DEFAULT: "#E8E3DA",
          muted: "#D6D0C7",
          subtle: "#A9A39A",
        },
        accent: {
          DEFAULT: "#8A8175",
          muted: "#5E5A54",
        },
        border: {
          DEFAULT: "rgba(232, 227, 218, 0.08)",
          strong: "rgba(232, 227, 218, 0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem,12vw,8rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3rem,8vw,6.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem,5vw,4rem)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.25rem,2vw,1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "editorial-xl": ["clamp(1.125rem,1.75vw,1.5rem)", { lineHeight: "1.65", letterSpacing: "-0.005em" }],
        "editorial-lg": ["clamp(1rem,1.5vw,1.25rem)", { lineHeight: "1.7", letterSpacing: "-0.01em" }],
        "editorial-md": ["clamp(0.875rem,1.25vw,1rem)", { lineHeight: "1.75", letterSpacing: "0em" }],
        "editorial-sm": ["0.8125rem", { lineHeight: "1.8", letterSpacing: "0.01em" }],
      },
      spacing: {
        section: "clamp(8rem,16vw,14rem)",
        "section-lg": "clamp(10rem,20vw,18rem)",
        "section-sm": "clamp(5rem,12vw,9rem)",
        "section-xs": "clamp(3rem,8vw,6rem)",
        "editorial": "clamp(2rem,5vw,4rem)",
        "editorial-lg": "clamp(3rem,7vw,6rem)",
      },
      maxWidth: {
        editorial: "90rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
