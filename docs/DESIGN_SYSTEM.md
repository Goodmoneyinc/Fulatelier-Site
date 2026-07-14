# Fulatelier Design System

Single source of truth: [`lib/constants.ts`](../lib/constants.ts)

## Colors

| Token | Hex | Role |
|-------|-----|------|
| background | `#0A1628` | Page background |
| accent | `#A37E2C` | Primary accent |
| goldLight | `#C9A84C` | Hover + small gold text on cards (WCAG AA) |
| text | `#F2EDE4` | Primary text — never `#FFFFFF` |
| subtle | `#8A9AB0` | Secondary text (exact value; do not darken) |
| cardBg | `#1A2A40` | Card / panel surface |
| footerBg | `#050D1A` | Footer background |

## Typography

- **Display:** Playfair Display (`--font-playfair`) — headlines, prices, large numbers, tier names only
- **Body:** Inter (`--font-inter`) — everything else
- **H1:** 48px mobile / 88px desktop, weight 700, tracking -0.02em, line-height 1.1
- **H2:** 32px mobile / 56px desktop, weight 700

## Spacing

- Section padding: 80px mobile / 120px desktop
- Content max-width: 1200px

## Corners

Sharp only — `border-radius: 0` on cards, buttons, and frames.
