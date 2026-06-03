# WAYLINKS — Visual Overhaul

**Date:** 2026-06-03
**Status:** Approved — Ready for Implementation
**Based on:** 2026-06-02-waylinks-design.md (base spec)

---

## Scope

Major visual upgrade to transform WAYLINKS from a clean Linktree-style page into a premium, cinematic personal brand landing page with layered depth, logo integration, enhanced interactions, and polished motion design.

---

## Logo Integration

- **Asset:** `assets/logo.png` (copied from `Image/myw way logo.png`)
- **Placement:** Centered in hero section above the "way" wordmark
- **Animation:** Scale-up + fade-in entrance (0.8s, cubic-bezier(0.16, 1, 0.3, 1))
- **Glow:** Soft neon orange `filter: drop-shadow()` pulsing in sync with wordmark breathing
- **Responsive:** Proper sizing for desktop (larger) and mobile (proportional)

---

## Background System

Upgrade from 2 to 5 layered radial gradient fields:

| Layer | Position | Size | Opacity | Drift Speed |
|---|---|---|---|---|
| 1 | 15% 25% | 700px | 0.08 | 18s |
| 2 | 85% 75% | 500px | 0.06 | 14s |
| 3 | 50% 50% | 400px | 0.04 | 20s |
| 4 | 30% 80% | 300px | 0.03 | 12s |
| 5 | 70% 20% | 350px | 0.05 | 16s |

Plus a subtle dot-grid overlay for texture (CSS `background-image` with tiny dots at 5% white, 40px spacing).

All layers use `will-change: transform` and animate `transform` only — no layout cost.

---

## Hero Section

Structure (top to bottom):
1. Logo image (dominant element, ~120px on desktop)
2. "way" wordmark (secondary, ~48px)
3. Tagline "building digital presence" (tertiary, unchanged)

Logo reveal sequence:
- Logo scales from 0.8 → 1.0 with opacity 0 → 1 (0.8s, cubic-bezier)
- Wordmark fades in after logo settles (0.6s delay)
- Tagline fades in after wordmark (0.3s additional delay)

Breathing glow synchronized between logo and wordmark via CSS `animation-delay` on same keyframe timeline.

---

## Link Card Upgrades

### Animated Hover Border
- `::before` pseudo-element with `conic-gradient` border
- Spins 360° on hover using `rotate` animation
- Clipped to card shape via `mask` / `clip-path` technique

### Shimmer Sweep
- `::after` pseudo-element with diagonal gradient (white → transparent)
- Translates across card on hover (left to right, 0.6s)
- Very subtle — barely visible but adds perceived polish

### Enhanced Lift
- `translateY(-8px)` instead of `-4px`
- `box-shadow` increased to `0 0 40px rgba(255,106,0,0.2)`
- Longer transition: 0.4s instead of 0.3s

### Icon Area Pulse
- Icon background glows on hover: opacity pulse + subtle scale
- Icon color intensifies

---

## Motion Design

### Timing Curves
- All entrances: `cubic-bezier(0.16, 1, 0.3, 1)`
- All hover transitions: `cubic-bezier(0.16, 1, 0.3, 1)`

### Staggered Loading
| Element | Delay | Duration |
|---|---|---|
| Logo | 0ms | 800ms |
| Wordmark | 600ms | 600ms |
| Tagline | 900ms | 500ms |
| Card 1 | 1200ms | 600ms |
| Card 2 | 1400ms | 600ms |
| Card 3 | 1600ms | 600ms |
| Card 4 | 1800ms | 600ms |
| Footer | 2000ms | 400ms |

---

## Files Modified

- `index.html` — Add logo image, card pseudo-element structures, reorder hero
- `style.css` — Background layers, logo styles, card upgrades, motion timing, dot-grid overlay
- `script.js` — No changes expected (mouse glow unaffected)

---

## Performance Rules

- All animations use `transform`/`opacity` only
- No layout-triggering properties animated
- CSS `will-change` on animated layers
- `prefers-reduced-motion` respected
- Dot-grid uses CSS `background-image` (GPU-composited)
- 60 FPS target maintained
