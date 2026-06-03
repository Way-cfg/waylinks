# WAYLINKS — Professional Redesign

**Date:** 2026-06-03
**Status:** Approved — Ready for Implementation
**Supersedes:** 2026-06-03-waylinks-visual-overhaul.md (rejected direction)

---

## Philosophy

Pivot from cyberpunk neon to clean product portfolio. Hierarchy, spacing, typography, and composition create quality — not effects. The page should feel intentional, premium, and professionally designed.

---

## Background

- Solid `#0a0a0a`
- Single static radial gradient for depth (very low opacity 0.03, 30s drift)
- No grid overlay, no multi-layer system, no animated glow fields

---

## Hero

1. **Avatar:** Circular GitHub profile image (120px desktop, 96px mobile). `box-shadow` for depth + subtle white ring (`2px solid rgba(255,255,255,0.1)`). No glow.
2. **"Way":** 32px, font-weight 700, letter-spacing -1px, slight warm tint. Brand presence without effects.
3. **Tagline:** "building digital presence" — 15px, muted (`rgba(255,255,255,0.55)`).

---

## Link Cards

- Background: `rgba(255,255,255,0.04)`
- Border: `1px solid rgba(255,255,255,0.08)` → `rgba(255,255,255,0.15)` on hover
- Radius: 10px
- Padding: 16px 20px
- Left: orange accent dot (3px circle, `#ff6a00`) with subtle 3s breathing pulse
- Label: 15px, font-weight 500
- Right: arrow `→` in muted gray
- Hover: translateY(-2px), border brightens, arrow shifts right 2px
- No pseudo-element borders, no shimmer, no glow

---

## Motion

- Curve: `cubic-bezier(0.22, 1, 0.36, 1)`
- Hero fade-in: 0.8s
- Cards stagger: 0.6s each, delays 0.9s / 1.05s / 1.2s / 1.35s
- Footer fade: at 1.5s
- Hover transitions: 0.2s ease

---

## Files Modified

- `index.html` — Rewrite hero + cards, remove bg layers
- `style.css` — Complete rewrite with clean design system
- `script.js` — Remove (mouse glow no longer needed)
- `assets/avatar.jpg` — New GitHub avatar image
