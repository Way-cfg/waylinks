# WAYLINKS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a premium single-page personal link hub for "Way" with neon orange glassmorphism aesthetic and smooth CSS animations.

**Architecture:** 3 static files (HTML + CSS + JS) with zero dependencies. CSS handles all styling and animations. JS handles optional mouse-follow glow only. Deployed via GitHub Pages.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Git/GitHub Pages

---

### Task 1: Create index.html

**Files:**
- Create: `index.html`

- [ ] **Write index.html with semantic structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Way — building digital presence" />
  <title>Way</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <div class="bg-glow"></div>
  <div class="mouse-glow" id="mouseGlow"></div>

  <main class="container">
    <header class="header">
      <h1 class="logo">way</h1>
      <p class="tagline">building digital presence</p>
    </header>

    <nav class="links">
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: 0ms">
        <span class="link-icon"><svg><!-- YouTube SVG --></svg></span>
        <span class="link-label">YouTube</span>
        <span class="link-arrow">→</span>
      </a>

      <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: 100ms">
        <span class="link-icon"><svg><!-- Twitch SVG --></svg></span>
        <span class="link-label">Twitch</span>
        <span class="link-arrow">→</span>
      </a>

      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: 200ms">
        <span class="link-icon"><svg><!-- GitHub SVG --></svg></span>
        <span class="link-label">GitHub</span>
        <span class="link-arrow">→</span>
      </a>

      <a href="https://kick.com" target="_blank" rel="noopener noreferrer" class="link-card" style="animation-delay: 300ms">
        <span class="link-icon"><svg><!-- Kick SVG --></svg></span>
        <span class="link-label">Kick</span>
        <span class="link-arrow">→</span>
      </a>
    </nav>

    <footer class="footer">
      <p>&copy; Way</p>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Replace SVG placeholders with actual icons**

YouTube icon (play triangle in rounded rect):
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="4" />
  <polygon points="10,8 16,12 10,16" fill="currentColor" />
</svg>
```

Twitch icon:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 2H3v16h5v4l4-4h5l4-4V2z" />
  <line x1="11" y1="7" x2="11" y2="11" />
  <line x1="17" y1="7" x2="17" y2="11" />
</svg>
```

GitHub icon (cat silhouette):
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.167 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.03 1.54 1.03.9 1.54 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-2 1.03-2.7-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.6 1.03 2.7 0 3.84-2.34 4.69-4.57 4.94.36.31.68.93.68 1.88v2.78c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
</svg>
```

Kick icon:
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20" rx="5" />
  <polygon points="10,7 16,12 10,17" fill="currentColor" />
</svg>
```

- [ ] **Commit index.html**

```bash
git add index.html
git commit -m "feat: add index.html with semantic structure and SVG icons"
```

---

### Task 2: Create style.css

**Files:**
- Create: `style.css`

- [ ] **Write full style.css**

```css
/* Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --bg: #0a0a0a;
  --accent: #ff6a00;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-hover: rgba(255, 255, 255, 0.08);
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.5);
  --radius: 12px;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

html, body {
  height: 100%;
}

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Background animated glow */
.bg-glow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(600px circle at 20% 30%, rgba(255, 106, 0, 0.06), transparent 50%),
    radial-gradient(400px circle at 80% 70%, rgba(255, 106, 0, 0.04), transparent 50%);
  animation: bgDrift 15s ease-in-out infinite alternate;
}

@keyframes bgDrift {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.1) translate(-2%, -2%); }
}

/* Mouse glow */
.mouse-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 106, 0, 0.08), transparent 70%);
  pointer-events: none;
  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.mouse-glow.visible {
  opacity: 1;
}

/* Container */
.container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  padding: 40px 24px;
  text-align: center;
}

/* Header */
.header {
  margin-bottom: 40px;
}

.logo {
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -2px;
  color: var(--text);
  animation: breathe 3s ease-in-out infinite;
  line-height: 1.1;
}

@keyframes breathe {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 106, 0, 0.3); }
  50% { text-shadow: 0 0 40px rgba(255, 106, 0, 0.7), 0 0 60px rgba(255, 106, 0, 0.3); }
}

.tagline {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 8px;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* Links */
.links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  animation: fadeInUp 0.6s ease both;
  cursor: pointer;
}

.link-card:hover {
  transform: translateY(-4px);
  background: var(--glass-hover);
  box-shadow: 0 0 20px rgba(255, 106, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.3);
}

.link-card:active {
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
}

.link-icon svg {
  width: 20px;
  height: 20px;
}

.link-label {
  flex: 1;
  text-align: left;
  margin-left: 14px;
}

.link-arrow {
  color: var(--text-muted);
  font-size: 18px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

/* Footer */
.footer {
  margin-top: 40px;
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
}

/* Responsive */
@media (max-width: 480px) {
  .container {
    padding: 32px 20px;
  }

  .logo {
    font-size: 44px;
  }

  .link-card {
    padding: 14px 16px;
    font-size: 15px;
  }

  .link-icon {
    width: 36px;
    height: 36px;
  }

  .link-icon svg {
    width: 18px;
    height: 18px;
  }
}

@media (min-width: 768px) {
  .logo {
    font-size: 72px;
  }

  .container {
    max-width: 460px;
  }
}
```

- [ ] **Commit style.css**

```bash
git add style.css
git commit -m "feat: add style.css with glassmorphism cards, neon glow, animations"
```

---

### Task 3: Create script.js

**Files:**
- Create: `script.js`

- [ ] **Write script.js for optional mouse glow**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const glow = document.getElementById('mouseGlow');
  if (!glow) return;

  let rafId = null;

  const handleMouseMove = (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glow.classList.contains('visible')) {
        glow.classList.add('visible');
      }
      rafId = null;
    });
  };

  const handleMouseLeave = () => {
    glow.classList.remove('visible');
  };

  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);

  // Detect low performance: disable if frame rate drops
  let lastTime = performance.now();
  let frameDrops = 0;

  const checkPerformance = () => {
    const now = performance.now();
    const delta = now - lastTime;
    lastTime = now;

    if (delta > 50) {
      frameDrops++;
      if (frameDrops > 5) {
        glow.remove();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        return;
      }
    }
    requestAnimationFrame(checkPerformance);
  };

  requestAnimationFrame(checkPerformance);
});
```

- [ ] **Commit script.js**

```bash
git add script.js
git commit -m "feat: add script.js with optional mouse glow and perf detection"
```

---

### Task 4: Create README.md

**Files:**
- Create: `README.md`

- [ ] **Write README.md**

```markdown
# WAYLINKS

Personal link hub for **Way** — a premium, cinematic landing page with neon orange glassmorphism aesthetic.

## Features

- Neon orange cyberpunk-inspired design
- Glassmorphism UI cards
- Smooth CSS animations (staggered load, breathing glow, hover effects)
- Optional mouse-follow glow (auto-disables on low performance)
- Mobile-first responsive
- Zero dependencies

## Setup

```bash
git clone https://github.com/Way-cfg/waylinks.git
cd waylinks
```

Open `index.html` in any browser — that's it. No build step required.

## GitHub Pages Deployment

1. Push to repository `Way-cfg/waylinks`
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://way-cfg.github.io/waylinks/`

## Tech Stack

HTML5 · CSS3 · Vanilla JavaScript · GitHub Pages
```

- [ ] **Commit README.md**

```bash
git add README.md
git commit -m "docs: add README.md with setup and deployment guide"
```

---

### Task 5: Git Init, Push, and Deploy

**Files:** (no file changes)

- [ ] **Initialize git repo and configure local identity**

```bash
git init
git config --local user.name "Way-cfg"
git config --local user.email "235174542+Way-cfg@users.noreply.github.com"
git branch -M main
```

- [ ] **Create GitHub repository and push**

```bash
gh repo create waylinks --public --push --source=. --remote=origin
```

- [ ] **Enable GitHub Pages via gh CLI**

```bash
gh api repos/Way-cfg/waylinks/pages -X POST --input - <<'EOF'
{
  "source": {
    "branch": "main",
    "path": "/"
  }
}
EOF
```

- [ ] **Print the live URL**

```bash
gh api repos/Way-cfg/waylinks/pages | jq -r '.html_url'
```
