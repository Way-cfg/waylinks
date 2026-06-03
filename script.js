document.addEventListener('DOMContentLoaded', () => {
  const glow = document.getElementById('mouseGlow');
  if (!glow) return;
  if (!matchMedia('(hover: hover)').matches) return;

  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
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

  let frameDrops = 0;
  let lastTime = 0;

  const checkPerformance = (now) => {
    if (!lastTime) {
      lastTime = now;
      requestAnimationFrame(checkPerformance);
      return;
    }

    const delta = now - lastTime;

    if (delta > 50) {
      frameDrops++;
      if (frameDrops >= 5) {
        glow.remove();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        return;
      }
    }
    lastTime = now;
    requestAnimationFrame(checkPerformance);
  };

  requestAnimationFrame(checkPerformance);
});
