class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.hoverTarget = null;
    this.rafId = null;
    this.boundResize = this.resize.bind(this);
    this.boundMove = this.onMouseMove.bind(this);
    this.boundHoverIn = this.onCardHover.bind(this);
    this.boundHoverOut = this.onCardLeave.bind(this);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('pointermove', this.boundMove);
    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('mouseenter', this.boundHoverIn);
      el.addEventListener('mouseleave', this.boundHoverOut);
    });
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(160, Math.floor((window.innerWidth * window.innerHeight) / 8000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1
      });
    }
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  onCardHover(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    this.hoverTarget = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  onCardLeave() {
    this.hoverTarget = null;
  }

  animate() {
    this.rafId = requestAnimationFrame(() => this.animate());
    this.update();
    this.draw();
  }

  update() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const mx = this.mouse.x;
    const my = this.mouse.y;

    for (const p of this.particles) {
      p.vx += (Math.random() - 0.5) * 0.06;
      p.vy += (Math.random() - 0.5) * 0.06;

      let targetX = mx;
      let targetY = my;
      let attractStrength = 0.006;

      if (this.hoverTarget) {
        const hdx = this.hoverTarget.x - mx;
        const hdy = this.hoverTarget.y - my;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hdist > 1) {
          targetX = mx + hdx * 0.3;
          targetY = my + hdy * 0.3;
          attractStrength = 0.012;
        }
      }

      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 300 && dist > 0) {
        p.vx += (dx / dist) * attractStrength * (300 - dist) / 300;
        p.vy += (dy / dist) * attractStrength * (300 - dist) / 300;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      p.vx *= 0.97;
      p.vy *= 0.97;
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255, 106, 0, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.shadowColor = 'rgba(255, 106, 0, 0.6)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#ff6a00';
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('pointermove', this.boundMove);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-bg');
  if (canvas) {
    const bg = new ParticleBackground(canvas);
    window.__particleBg = bg;
  }
});
