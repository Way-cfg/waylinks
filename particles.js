(function() {
  var canvas = document.getElementById('particle-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  var count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 20000));
  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.12),
      r: Math.random() * 3.5 + 2.5,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() * 35 + 15
    });
  }

  var mouseX = -1000;
  var mouseY = -1000;
  document.addEventListener('pointermove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    requestAnimationFrame(animate);
    var w = canvas.width;
    var h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.phase += 0.025;
      p.vx += Math.sin(p.phase) * 0.012;
      p.vy -= 0.003;

      var dx = mouseX - p.x;
      var dy = mouseY - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 350 && dist > 0) {
        var strength = 0.004 * (350 - dist) / 350;
        p.vx += (dx / dist) * strength;
        p.vy += (dy / dist) * strength;
      }

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.97;
      p.vy *= 0.97;

      if (p.y < -30 || p.x < -40 || p.x > w + 40) {
        p.x = Math.random() * w;
        p.y = h + 20;
        p.vx = (Math.random() - 0.5) * 0.25;
        p.vy = -(Math.random() * 0.35 + 0.12);
        p.r = Math.random() * 3.5 + 2.5;
        p.hue = Math.random() * 35 + 15;
      }
      if (p.y > h + 40) {
        p.y = -10;
        p.vy = -(Math.random() * 0.35 + 0.12);
      }

      var pulse = 0.5 + 0.5 * Math.sin(p.phase);
      var fade = 1 - Math.max(0, p.y) / h;
      var alpha = (0.6 + 0.4 * pulse) * (0.6 + 0.4 * Math.max(0, fade));

      ctx.shadowColor = 'hsla(' + p.hue + ', 100%, 55%, ' + (alpha * 0.6) + ')';
      ctx.shadowBlur = 25;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 60%, ' + alpha + ')';
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.15, p.y - p.r * 0.15, p.r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + (p.hue + 10) + ', 100%, 82%, ' + (alpha * 0.9) + ')';
      ctx.fill();
    }

    ctx.shadowBlur = 0;
  }

  animate();
})();

(function() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cards = document.querySelectorAll('.card');
  for (var i = 0; i < cards.length; i++) {
    (function(card) {
      var ticking = false;
      card.addEventListener('mousemove', function(e) {
        if (!ticking) {
          requestAnimationFrame(function() {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cx = rect.width / 2;
            var cy = rect.height / 2;
            var rx = ((y - cy) / cy) * -5;
            var ry = ((x - cx) / cx) * 5;
            card.style.transition = 'transform 0.05s';
            card.style.transform = 'perspective(600px) translateY(-3px) scale(1.02) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
            ticking = false;
          });
          ticking = true;
        }
      });
      card.addEventListener('mouseleave', function() {
        card.style.transition = '';
        card.style.transform = '';
      });
    })(cards[i]);
  }
})();
