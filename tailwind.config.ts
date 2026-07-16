import type { Config } from "tailwindcss";
import { colors, radii, spacing, typography } from "./lib/constants";

/**
 * Fulatelier Tailwind theme.
 * Colors and spacing are imported from lib/constants.ts —
 * no hardcoded hex or px values here.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        accent: {
          DEFAULT: colors.accent,
          /** WCAG-safe gold for small text on card surfaces */
          light: colors.goldLight,
        },
        "gold-light": colors.goldLight,
        text: colors.text,
        subtle: colors.subtle,
        card: colors.cardBg,
        footer: colors.footerBg,
      },
      fontFamily: {
        playfair: [typography.display, "Georgia", "serif"],
        inter: [typography.body, "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        h1: [
          typography.h1.mobile,
          {
            lineHeight: typography.h1.lineHeight,
            letterSpacing: typography.h1.tracking,
            fontWeight: typography.h1.weight,
          },
        ],
        "h1-desktop": [
          typography.h1.desktop,
          {
            lineHeight: typography.h1.lineHeight,
            letterSpacing: typography.h1.tracking,
            fontWeight: typography.h1.weight,
          },
        ],
        h2: [
          typography.h2.mobile,
          {
            fontWeight: typography.h2.weight,
          },
        ],
        "h2-desktop": [
          typography.h2.desktop,
          {
            fontWeight: typography.h2.weight,
          },
        ],
      },
      maxWidth: {
        content: spacing.contentMaxWidth,
      },
      spacing: {
        "section-mobile": spacing.sectionPaddingMobile,
        "section-desktop": spacing.sectionPaddingDesktop,
      },
      borderRadius: {
        none: radii.none,
        DEFAULT: radii.none,
        sm: radii.none,
        md: radii.none,
        lg: radii.none,
        xl: radii.none,
        "2xl": radii.none,
        "3xl": radii.none,
        full: radii.none,
      },
    },
  },
  plugins: [],
};

export default config;
