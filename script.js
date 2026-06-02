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
