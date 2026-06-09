class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;
    this.particles = [];
    this.mouse = { x: -1000, y: -1000 };
    this.hoverTarget = null;
    this.rafId = null;
    this.boundResize = this.resize.bind(this);
    this.boundMove = this.onMouseMove.bind(this);
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('pointermove', this.boundMove);
    this.addCardListeners();
    this.createParticles();
    this.animate();
  }

  addCardListeners() {
    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('mouseenter', (e) => this.onCardHover(e));
      el.addEventListener('mouseleave', () => this.onCardLeave());
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(55, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createEmber());
    }
  }

  createEmber() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1),
      r: Math.random() * 3.5 + 2.5,
      alpha: Math.random() * 0.4 + 0.6,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() * 35 + 15
    };
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
      p.phase += 0.025;
      p.vx += Math.sin(p.phase) * 0.012;
      p.vy -= 0.002;

      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 350 && dist > 0) {
        const strength = 0.004 * (350 - dist) / 350;
        p.vx += (dx / dist) * strength;
        p.vy += (dy / dist) * strength;
      }

      if (this.hoverTarget) {
        const hdx = this.hoverTarget.x - p.x;
        const hdy = this.hoverTarget.y - p.y;
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy);
        if (hdist < 350 && hdist > 0) {
          const strength = 0.012 * (350 - hdist) / 350;
          p.vx += (hdx / hdist) * strength;
          p.vy += (hdy / hdist) * strength;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.97;
      p.vy *= 0.97;

      if (p.y < -30) {
        Object.assign(p, this.createEmber());
        p.y = h + 20;
      }
      if (p.x < -40) p.x = w + 20;
      if (p.x > w + 40) p.x = -20;
      if (p.y > h + 40) {
        Object.assign(p, this.createEmber());
        p.y = -20;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    for (const p of this.particles) {
      const pulse = 0.5 + 0.5 * Math.sin(p.phase);
      const alpha = p.alpha * (0.6 + 0.4 * pulse);

      ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${alpha * 0.6})`;
      ctx.shadowBlur = 25;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
      ctx.fill();

      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue + 10}, 100%, 80%, ${alpha})`;
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(45, 100%, 92%, ${alpha})`;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
  }

}

const canvas = document.getElementById('particle-bg');
if (canvas) {
  new ParticleBackground(canvas);
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.card').forEach(card => {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rx = ((y - cy) / cy) * -5;
          const ry = ((x - cx) / cx) * 5;
          card.style.transition = 'transform 0.05s';
          card.style.transform = `perspective(600px) translateY(-3px) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = '';
      card.style.transform = '';
    });
  });
}
