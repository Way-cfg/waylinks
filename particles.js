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
    const count = Math.min(160, Math.floor((window.innerWidth * window.innerHeight) / 8000));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 3 + 1.5
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
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#ff6a00';
    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

}

const canvas = document.getElementById('particle-bg');
if (canvas) {
  new ParticleBackground(canvas);
}

// Card 3D tilt
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
