# WAYLINKS Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development

**Goal:** Upgrade WAYLINKS from a clean link page to a cinematic brand landing page with layered depth background, logo hero, animated card interactions, and premium motion design.

**Architecture:** Modify index.html (logo integration, hero restructure, card pseudo-elements) and style.css (background layers, logo/wordmark glow, card upgrades, cubic-bezier motion). No JS changes.

**Tech Stack:** HTML5, CSS3

---

### Task 1: Background System — Upgrade to 5-Layer Depth

**Files:**
- Modify: `style.css` (background section)

Replace the existing 2-layer `.bg-glow` with 5 drifting layers plus dot-grid overlay and the new `.bg-layer` structure. The HTML gets 5 `.bg-layer` divs replacing the single `.bg-glow`.

**index.html changes:**
```html
<!-- Replace: <div class="bg-glow"></div> -->
<!-- With: -->
<div class="bg-layer" style="--i: 1"></div>
<div class="bg-layer" style="--i: 2"></div>
<div class="bg-layer" style="--i: 3"></div>
<div class="bg-layer" style="--i: 4"></div>
<div class="bg-layer" style="--i: 5"></div>
<div class="bg-grid"></div>
```

**style.css changes:**

Remove the old `.bg-glow` and `@keyframes bgDrift` blocks. Add:

```css
/* Background layers */
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
}

.bg-layer:nth-child(1) {
  background: radial-gradient(700px circle at 15% 25%, rgba(255, 106, 0, 0.08), transparent 50%);
  animation: drift1 18s ease-in-out infinite alternate;
}

.bg-layer:nth-child(2) {
  background: radial-gradient(500px circle at 85% 75%, rgba(255, 106, 0, 0.06), transparent 50%);
  animation: drift2 14s ease-in-out infinite alternate;
}

.bg-layer:nth-child(3) {
  background: radial-gradient(400px circle at 50% 50%, rgba(255, 106, 0, 0.04), transparent 50%);
  animation: drift3 20s ease-in-out infinite alternate;
}

.bg-layer:nth-child(4) {
  background: radial-gradient(300px circle at 30% 80%, rgba(255, 106, 0, 0.03), transparent 50%);
  animation: drift4 12s ease-in-out infinite alternate;
}

.bg-layer:nth-child(5) {
  background: radial-gradient(350px circle at 70% 20%, rgba(255, 106, 0, 0.05), transparent 50%);
  animation: drift5 16s ease-in-out infinite alternate;
}

@keyframes drift1 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-3%, -2%) scale(1.1); }
}

@keyframes drift2 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(2%, 3%) scale(1.08); }
}

@keyframes drift3 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-1%, 4%) scale(1.12); }
}

@keyframes drift4 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(3%, -2%) scale(1.06); }
}

@keyframes drift5 {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-2%, -3%) scale(1.09); }
}

/* Dot grid overlay */
.bg-grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

Update the container z-index to sit above all layers:
```css
.container {
  position: relative;
  z-index: 3;
  /* ... rest unchanged */
}
```

---

### Task 2: Hero Section — Logo Integration + Enhanced Wordmark

**Files:**
- Modify: `index.html` (hero section)
- Modify: `style.css` (header/logo/wordmark section)

**index.html changes:**

Restructure the header to put logo first, then wordmark:
```html
<header class="header">
  <div class="logo-wrapper">
    <img src="assets/logo.png" alt="Way" class="brand-logo" />
  </div>
  <h1 class="wordmark">way</h1>
  <p class="tagline">building digital presence</p>
</header>
```

**style.css changes:**

Replace the `.logo` block with:

```css
/* Logo */
.logo-wrapper {
  margin-bottom: 20px;
  animation: logoReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.brand-logo {
  width: 120px;
  height: auto;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 0 20px rgba(255, 106, 0, 0.3));
  animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoReveal {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes logoGlow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 106, 0, 0.3)); }
  50% { filter: drop-shadow(0 0 40px rgba(255, 106, 0, 0.6)); }
}

/* Wordmark */
.wordmark {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -2px;
  color: var(--text);
  animation: wordmarkReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both, breathe 3s ease-in-out 0.6s infinite;
  line-height: 1.1;
}

@keyframes wordmarkReveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breathe {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 106, 0, 0.3); }
  50% { text-shadow: 0 0 40px rgba(255, 106, 0, 0.7), 0 0 60px rgba(255, 106, 0, 0.3); }
}
```

Remove the old `.logo` and `.tagline` animation (tagline becomes static or simpler):

```css
.tagline {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 8px;
  font-weight: 400;
  letter-spacing: 0.5px;
  animation: taglineReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both;
}

@keyframes taglineReveal {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Update the .header margin-bottom:
```css
.header {
  margin-bottom: 48px;
}
```

Update responsive sizes:
```css
@media (max-width: 480px) {
  .brand-logo {
    width: 90px;
  }
  .wordmark {
    font-size: 36px;
  }
}

@media (min-width: 768px) {
  .brand-logo {
    width: 140px;
  }
  .wordmark {
    font-size: 56px;
  }
}
```

---

### Task 3: Card Interactions — Animated Borders + Shimmer + Enhanced Hover

**Files:**
- Modify: `style.css` (cards section)
- Modify: `index.html` (wrapping cards for pseudo-element support)

**index.html changes:**

Add `data-icon` attributes and wrapper spans inside each `.link-card`:
```html
<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: 1.2s">
  <span class="card-shimmer"></span>
  <span class="link-icon">...</span>
  <span class="link-label">YouTube</span>
  <span class="link-arrow">→</span>
</a>
```

(The `::before` and `::after` pseudo-elements on `.link-card` will be used for the animated border and shimmer.)

**style.css changes:**

Remove the old `.link-card:hover` block. Replace the card section with:

```css
/* Links */
.links {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.link-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 18px 22px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  cursor: pointer;
  overflow: hidden;
}

/* Animated gradient border (hidden by default) */
.link-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: calc(var(--radius) + 2px);
  background: conic-gradient(
    transparent,
    rgba(255, 106, 0, 0.4),
    transparent,
    rgba(255, 106, 0, 0.4),
    transparent
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
  animation: borderSpin 2s linear infinite;
}

.link-card:hover::before {
  opacity: 1;
}

@keyframes borderSpin {
  to { transform: rotate(360deg); }
}

/* Shimmer effect (hidden by default) */
.card-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.link-card:hover .card-shimmer {
  opacity: 1;
  animation: shimmer 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

/* Card hover */
.link-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 40px rgba(255, 106, 0, 0.2), 0 12px 48px rgba(0, 0, 0, 0.4);
}

.link-card:active {
  transform: translateY(-4px);
}

.link-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Icon pulse on hover */
.link-card:hover .link-icon {
  background: rgba(255, 106, 0, 0.2);
  transform: scale(1.05);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 106, 0, 0.1);
  color: var(--accent);
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease;
  position: relative;
  z-index: 2;
}

/* Arrow animation */
.link-arrow {
  color: var(--text-muted);
  font-size: 18px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
  position: relative;
  z-index: 2;
}

.link-card:hover .link-arrow {
  transform: translateX(6px);
  color: var(--accent);
}

.link-label {
  flex: 1;
  text-align: left;
  margin-left: 14px;
  position: relative;
  z-index: 2;
}

/* Fade-in-up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Update the link-card animation delays for the new staggered timing:
```html
<a ... class="link-card" style="animation-delay: 1.2s">  <!-- YouTube -->
<a ... class="link-card" style="animation-delay: 1.4s">  <!-- Twitch -->
<a ... class="link-card" style="animation-delay: 1.6s">  <!-- GitHub -->
<a ... class="link-card" style="animation-delay: 1.8s">  <!-- Kick -->
```

---

### Task 4: Footer Timing and Responsive Updates

**Files:**
- Modify: `index.html` (footer animation delay)
- Modify: `style.css` (footer animation)

```html
<footer class="footer" style="animation-delay: 2s">
```

```css
.footer {
  margin-top: 48px;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  animation: footerReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes footerReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Update responsive section for all new elements.

---

### Task 5: Reduce Motion + Touch Device Updates

Update the `prefers-reduced-motion` block and `hover: none` block to cover all new animated elements.

```css
@media (prefers-reduced-motion: reduce) {
  .bg-layer,
  .bg-grid,
  .brand-logo,
  .wordmark,
  .tagline,
  .link-card,
  .footer {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

  .link-card::before,
  .card-shimmer {
    display: none !important;
  }

  .brand-logo {
    filter: drop-shadow(0 0 20px rgba(255, 106, 0, 0.3));
  }

  .wordmark {
    text-shadow: 0 0 20px rgba(255, 106, 0, 0.3);
  }
}
```
