/**
 * Fulatelier Design System — single source of truth
 * ─────────────────────────────────────────────────
 * All colors, type, and spacing live here.
 * Tailwind (`tailwind.config.ts`) and CSS (`styles/globals.css`)
 * must read from these tokens. Do not hardcode hex/px elsewhere.
 */

export const colors = {
  /** Deep navy — page background */
  background: "#0A1628",
  /** Antique gold — primary accent */
  accent: "#A37E2C",
  /**
   * Lighter gold — hover states, and REQUIRED for any small
   * (under ~18px) gold text on card backgrounds. Base accent
   * fails WCAG AA there (3.85:1; needs 4.5:1).
   */
  goldLight: "#C9A84C",
  /** Cream — primary text. NEVER pure white / #FFFFFF. */
  text: "#F2EDE4",
  /**
   * Muted slate — secondary text. Exact value clears WCAG AA
   * on both navy and card backgrounds. Do not darken.
   */
  subtle: "#8A9AB0",
  /** Card / panel surface */
  cardBg: "#1A2A40",
  /** Footer background — one step darker than page background */
  footerBg: "#050D1A",
} as const;

export const typography = {
  /**
   * Playfair Display — ONLY for headlines, prices, large numbers,
   * tier names. NEVER body copy.
   */
  display: "var(--font-playfair)",
  /** Inter — everything else */
  body: "var(--font-inter)",
  h1: {
    mobile: "48px",
    desktop: "88px",
    weight: "700",
    tracking: "-0.02em",
    lineHeight: "1.1",
  },
  h2: {
    mobile: "32px",
    desktop: "56px",
    weight: "700",
  },
} as const;

export const spacing = {
  sectionPaddingMobile: "80px",
  sectionPaddingDesktop: "120px",
  contentMaxWidth: "1200px",
} as const;

/** Sharp corners site-wide — never apply border-radius to cards/buttons/frames. */
export const radii = {
  none: "0px",
} as const;

export type ColorToken = keyof typeof colors;
