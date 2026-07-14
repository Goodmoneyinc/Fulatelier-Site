import type { Config } from "tailwindcss";

/**
 * Fulatelier Tailwind theme — maps design-system tokens.
 * Requires `styles/globals.css` CSS variables.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        cream: "var(--color-text)",
        subtle: "var(--color-subtle)",
        card: "var(--color-card)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: [
          "var(--type-h1-size)",
          {
            lineHeight: "var(--type-h1-leading)",
            letterSpacing: "var(--type-h1-tracking)",
            fontWeight: "700",
          },
        ],
        h2: [
          "var(--type-h2-size)",
          {
            lineHeight: "var(--type-h2-leading)",
            letterSpacing: "var(--type-h2-tracking)",
            fontWeight: "700",
          },
        ],
        h3: [
          "var(--type-h3-size)",
          {
            lineHeight: "var(--type-h3-leading)",
            letterSpacing: "var(--type-h3-tracking)",
            fontWeight: "600",
          },
        ],
        body: [
          "var(--type-body-size)",
          {
            lineHeight: "var(--type-body-leading)",
            fontWeight: "400",
          },
        ],
        label: [
          "var(--type-label-size)",
          {
            lineHeight: "1.4",
            letterSpacing: "var(--type-label-tracking)",
            fontWeight: "600",
          },
        ],
      },
      maxWidth: {
        content: "var(--content-max-width)",
      },
      spacing: {
        "section-mobile": "var(--section-padding-mobile)",
        "section-desktop": "var(--section-padding-desktop)",
        gutter: "var(--column-gap)",
      },
      transitionTimingFunction: {
        signature: "var(--ease-signature)",
      },
      transitionDuration: {
        micro: "var(--duration-micro)",
        short: "var(--duration-short)",
        medium: "var(--duration-medium)",
      },
      boxShadow: {
        focus: "var(--focus-ring)",
      },
    },
  },
  plugins: [],
};

export default config;
