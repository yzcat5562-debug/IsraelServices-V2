(function () {
  var year_el = document.getElementById('year');
  if (year_el) {
    year_el.textContent = new Date().getFullYear();
  }

  // Cursor particle trail
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var particles = [];

  window.addEventListener('resize', function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', function(e) {
    // Add multiple particles for a denser trail
    for (var i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 1,
        size: Math.random() * 3 + 1.5
      });
    }
  });

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.015; // fade out speed
      p.size *= 0.96; // shrink

      if (p.life <= 0 || p.size <= 0.1) {
        particles.splice(i, 1);
        i--;
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(91, 155, 213, ' + p.life + ')'; // site's blue accent color
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
