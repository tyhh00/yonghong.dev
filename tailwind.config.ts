import type { Config } from "tailwindcss";

/**
 * All colors are driven by CSS variables (RGB triplets in globals.css) so the
 * three themes — light / dark / fuzzy — swap the same tokens. `<alpha-value>`
 * keeps Tailwind opacity utilities (e.g. `bg-fg/10`) working.
 */
const withOpacity = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: withOpacity("--bg"),
        "bg-elev": withOpacity("--bg-elev"),
        fg: withOpacity("--fg"),
        "fg-muted": withOpacity("--fg-muted"),
        "fg-subtle": withOpacity("--fg-subtle"),
        line: withOpacity("--line"),
        accent: withOpacity("--accent"),
        "accent-2": withOpacity("--accent-2"),
        "accent-fg": withOpacity("--accent-fg"),
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        prose: "68ch",
      },
      screens: {
        xs: "420px",
      },
      transitionTimingFunction: {
        // A calm, expensive-feeling ease used across reveals + hovers.
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.7" },
          "43%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        flicker: "flicker 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
