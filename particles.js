class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.rafId = null;
    this.boundResize = this.resize.bind(this);
    this.boundMove = this.onMouseMove.bind(this);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('pointermove', this.boundMove);
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
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
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 100;
      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        p.vx += (dx / dist) * force * 0.08;
        p.vy += (dy / dist) * force * 0.08;
      }

      p.vx *= 0.98;
      p.vy *= 0.98;
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = 'rgba(255, 106, 0, 0.5)';
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255, 106, 0, 0.08)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
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
