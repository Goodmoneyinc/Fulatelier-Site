# Fulatelier Design System

Locked direction for the Mississippi digital workshop marketplace.

## Direction

Deep-navy atelier. Cream type on navy. Antique gold as the single accent. Editorial display type for craft moments; clean sans for product UI. Quiet motion. Proof through real work (products, build log, permits) — not badge spam.

## Tokens

See `lib/design-system.ts` and `styles/globals.css`.

### Colors

```
Background   #0A1628
Accent       #A37E2C
Gold Light   #C9A84C
Text         #F2EDE4
Subtle       #6B7E96
Card BG      #1A2A40
```

### Type

| Role | Face | Spec |
|------|------|------|
| Display | Playfair Display | H1–H3 only |
| Body | Inter | Body, UI, labels |
| H1 | 72–96px / 700 / -0.02em | |
| H2 | 48–56px / 700 | |
| H3 | 28–32px / 600 | |
| Body | 16–18px / 400 / 1.7 | |
| Label | 11–12px / 600 / 0.2em / caps | |

### Spacing

| Token | Value |
|-------|-------|
| Section pad (desktop) | 120px |
| Section pad (mobile) | 80px |
| Content max-width | 1200px |
| Column gap | 48px |

### Motion

- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Micro 160ms · Short 220ms · Medium 320ms
- Press scale: 0.97
- Reduced motion: durations collapse to near-zero

## Quality gate

Every section must pass all 8 criteria in [`QUALITY_BAR.md`](./QUALITY_BAR.md).

## Reject list

- Purple / indigo SaaS gradients  
- Pure white text (`#FFFFFF`)  
- Inter-only or Roboto-only type systems  
- Unsplash stock hero images  
- Generic fade-up-on-scroll as the only motion  
- Desktop layout squeezed onto mobile  
- Cards in the hero  
- Multi-accent color clutter  
