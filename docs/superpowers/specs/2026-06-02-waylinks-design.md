# WAYLINKS — Personal Link Hub for "Way"

**Date:** 2026-06-02
**Status:** Approved — Ready for Implementation

---

## Overview

Single-page personal link hub (Linktree-style) for the brand "Way". A premium, cinematic landing page with neon cyber aesthetic, glassmorphism UI, and lightweight CSS/JS animations.

**Deployment:** GitHub Pages
**Tech Stack:** HTML, CSS, Vanilla JavaScript (no frameworks)

---

## Brand Identity

- **Background:** Pure black (`#0a0a0a`)
- **Accent color:** Neon orange (`#ff6a00`)
- **UI style:** Glassmorphism with backdrop-filter blur
- **Typography:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`)
- **Tone:** Minimal, premium, cinematic, cyberpunk-inspired

---

## Layout (Top → Bottom)

1. **Logo:** "way" in large display text with CSS text-shadow breathing glow (3s pulse)
2. **Tagline:** "building digital presence" in muted white/gray
3. **Link cards:** 4 full-width glass cards (YouTube, Twitch, GitHub, Kick)
4. **Footer:** "© Way" in tiny muted text

Each link card contains:
- Left-aligned SVG icon
- Platform name
- Subtle right arrow indicator
- Opens in new tab on click

---

## Animation System

| Animation | Technique | Timing |
|---|---|---|
| Page load stagger | CSS `@keyframes` fadeInUp (opacity + translateY) | 0–300ms delays per card |
| "way" breathing glow | CSS text-shadow pulse | 3s ease-in-out cycle |
| Card hover lift + glow | CSS transform + box-shadow transition | 300ms |
| Background drift | CSS radial-gradient position shift | 10–15s cycle |
| Mouse-follow glow (optional) | JS-driven radial gradient div | Only if smooth |

**Principles:** Subtle, smooth, non-intrusive. No canvas, no JS animation libraries.

---

## Technical Architecture

### Files

- `index.html` — Semantic HTML structure
- `style.css` — All styles organized as: reset → variables → background → layout → typography → cards → animations → responsive
- `script.js` — Minimal JS (optional mouse glow only)

### Constraints

- No frameworks
- No external dependencies
- No build step
- Production-ready for GitHub Pages
- Mobile-first responsive design

---

## Git & Deployment

- **Repo:** waylinks
- **Identity:** Way-cfg / 235174542+Way-cfg@users.noreply.github.com
- **Branch:** main
- **Hosting:** GitHub Pages

---

## Content

```
Header:  way
Tagline: building digital presence
Links:   YouTube | Twitch | GitHub | Kick
Footer:  © Way
```

---

## Design Rules

- Do NOT increase opacity of background effects
- Do NOT add heavy animations or particles
- Do NOT introduce extra visual noise
- Keep everything subtle, smooth, and intentional
- Maintain premium minimal cinematic aesthetic at all times
