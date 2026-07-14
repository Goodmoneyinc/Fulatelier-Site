# Fulatelier Quality Bar

Every section must pass **all 8** criteria before we move to the next one.

## 1. Point of view, not a template

Commit to a specific direction — Mississippi digital atelier: craft workshop meets high-end marketplace — and execute without flinching. No generic SaaS purple, no cream-serif-terracotta default, no broadsheet newspaper layout.

## 2. Typography that does work

- **Display:** Playfair Display — headlines only  
- **Body:** Inter — UI, body, labels  
- Never Inter/Roboto for both roles  
- Hierarchy: H1 72–96px / H2 48–56px / H3 28–32px / Body 16–18px / Label 11–12px uppercase tracked

## 3. Restrained color system

| Token | Hex | Role |
|-------|-----|------|
| Background | `#0A1628` | Page plane |
| Accent | `#A37E2C` | Primary CTA / focus |
| Gold Light | `#C9A84C` | Hover / highlight |
| Text | `#F2EDE4` | Primary copy (never pure white) |
| Subtle | `#6B7E96` | Secondary / meta |
| Card BG | `#1A2A40` | Surfaces |

Max 3–5 working colors; gold earns its keep.

## 4. Hierarchy that breathes

Whitespace, scale, and contrast create clear primary / secondary / tertiary. Section padding: **120px** desktop / **80px** mobile. Content max-width **1200px**. Column gap **48px**. No flat content walls.

## 5. Imagery with intent

No Unsplash defaults. Custom, generated for the brief, or tightly curated workshop / product photography that could only belong to Fulatelier.

## 6. Motion that whispers

Hand-crafted micro-interactions only (press scale 0.97, ~160–320ms, signature ease). Not generic fade-up-on-scroll everywhere. Honor `prefers-reduced-motion`.

## 7. Mobile designed, not shrunk

Separate layout decisions for phone — stack, re-order, re-prioritize. Not a compressed desktop.

## 8. The invisible expensive stuff

- Sub-2s load (critical path lean)  
- WCAG AA contrast  
- Full keyboard nav + visible focus  
- Semantic HTML + landmarks  
- Real meta / OG tags  

---

**Gate:** A section that fails any criterion is not done. Fix before starting the next section.

Canonical tokens: `lib/design-system.ts` · `styles/globals.css`
