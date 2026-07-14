# Fulatelier Quality Bar

Every section must pass **all 8** criteria before we move to the next one.

## 1. Point of view, not a template

Commit to Mississippi digital atelier — craft workshop meets boutique studio — and execute without flinching.

## 2. Typography that does work

- **Display:** Playfair Display — headlines, prices, large numbers, tier names only
- **Body:** Inter — everything else
- Never Inter/Roboto for both roles
- H1: 48px → 88px · H2: 32px → 56px

## 3. Restrained color system

| Token | Hex |
|-------|-----|
| background | `#0A1628` |
| accent | `#A37E2C` |
| goldLight | `#C9A84C` |
| text | `#F2EDE4` |
| subtle | `#8A9AB0` |
| cardBg | `#1A2A40` |
| footerBg | `#050D1A` |

Never pure white. Use `goldLight` for small gold text on cards.

## 4. Hierarchy that breathes

Section padding 80px / 120px. Max-width 1200px. No flat content walls.

## 5. Imagery with intent

No Unsplash defaults. Custom or tightly curated.

## 6. Motion that whispers

Hand-crafted micro-interactions (Framer Motion). Honor `prefers-reduced-motion`.

## 7. Mobile designed, not shrunk

Separate layout decisions for phone.

## 8. The invisible expensive stuff

Sub-2s load · WCAG AA · keyboard nav · semantic HTML · real meta tags · sharp corners only

Canonical tokens: `lib/constants.ts`
