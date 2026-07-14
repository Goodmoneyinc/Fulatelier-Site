/**
 * Fulatelier Design System — canonical tokens
 * ─────────────────────────────────────────────
 * Source of truth for colors, type, spacing, motion.
 * Mirror any changes in `styles/globals.css` (:root).
 *
 * Quality bar: every section must pass all 8 criteria
 * in `docs/QUALITY_BAR.md` before shipping.
 */

export const colors = {
  background: "#0A1628",
  accent: "#A37E2C",
  goldLight: "#C9A84C",
  text: "#F2EDE4",
  subtle: "#6B7E96",
  card: "#1A2A40",
} as const;

export const typography = {
  display: {
    family: "var(--font-display)",
    fallback: '"Playfair Display", Georgia, "Times New Roman", serif',
  },
  body: {
    family: "var(--font-body)",
    fallback: 'Inter, ui-sans-serif, system-ui, sans-serif',
  },
  scale: {
    h1: {
      size: "clamp(2.75rem, 5vw + 1rem, 6rem)", // 44–96px
      weight: 700,
      tracking: "-0.02em",
      lineHeight: 1.05,
    },
    h2: {
      size: "clamp(2.25rem, 3vw + 1rem, 3.5rem)", // 36–56px
      weight: 700,
      tracking: "-0.015em",
      lineHeight: 1.15,
    },
    h3: {
      size: "clamp(1.5rem, 1.5vw + 0.75rem, 2rem)", // 24–32px
      weight: 600,
      tracking: "-0.01em",
      lineHeight: 1.25,
    },
    body: {
      size: "clamp(1rem, 0.2vw + 0.95rem, 1.125rem)", // 16–18px
      weight: 400,
      tracking: "0",
      lineHeight: 1.7,
    },
    label: {
      size: "clamp(0.6875rem, 0.1vw + 0.65rem, 0.75rem)", // 11–12px
      weight: 600,
      tracking: "0.2em",
      lineHeight: 1.4,
      transform: "uppercase" as const,
    },
  },
} as const;

export const spacing = {
  sectionPaddingDesktop: "120px",
  sectionPaddingMobile: "80px",
  contentMaxWidth: "1200px",
  columnGap: "48px",
  /** Breakpoints for mobile-designed (not shrunk) layouts */
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
  },
} as const;

export const motion = {
  /** Signature ease — Linear-tier whisper, not bounce */
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: {
    micro: 160,
    short: 220,
    medium: 320,
  },
  /** Press feedback (Linear-style) */
  pressScale: 0.97,
} as const;

export const qualityCriteria = [
  "point-of-view",
  "typography-that-works",
  "restrained-color",
  "hierarchy-that-breathes",
  "imagery-with-intent",
  "motion-that-whispers",
  "mobile-designed",
  "invisible-expensive",
] as const;

export type QualityCriterion = (typeof qualityCriteria)[number];
