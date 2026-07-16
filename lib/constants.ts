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
  /** Card / panel surface — one step lighter than page background */
  cardBg: "#1A2A40",
  /**
   * Footer background — tonal variant of `background`, one step darker
   * (`#050D1A` vs `#0A1628`). Not a new hue; same navy family for depth.
   */
  footerBg: "#050D1A",
} as const;

export const typography = {
  /**
   * Cormorant Garamond — ONLY for headlines, prices, large numbers,
   * tier names. NEVER body copy.
   */
  display: "var(--font-cormorant)",
  /** Inter — everything else */
  body: "var(--font-inter)",
  h1: {
    mobile: "56px",
    desktop: "104px",
    weight: "700",
    tracking: "-0.02em",
    lineHeight: "0.95",
  },
  h2: {
    mobile: "40px",
    desktop: "64px",
    weight: "600",
    tracking: "-0.02em",
    lineHeight: "1.05",
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

/**
 * External social / community destinations.
 * TODO: Replace these placeholder URLs with the live Fulatelier profiles.
 */
export const social = {
  /** Primary Build Log destination (Facebook) — used by Work + Build Log sections */
  buildLog: "https://www.facebook.com/fulatelier", // TODO: replace with real Build Log URL
  facebook: "https://www.facebook.com/fulatelier", // TODO: replace with real Facebook URL
  linkedin: "https://www.linkedin.com/company/fulatelier", // TODO: replace with real LinkedIn URL
} as const;

/** Primary site navigation — shared by Nav and Footer. */
export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export type ColorToken = keyof typeof colors;
export type NavLink = (typeof navLinks)[number];
