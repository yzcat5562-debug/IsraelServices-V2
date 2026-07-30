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

  // Premium Bokeh Snowflakes
  function createSnowflake() {
    var sf = document.createElement('div');
    sf.className = 'snowflake';
    sf.textContent = '✡';
    sf.style.left = Math.random() * 100 + 'vw';
    
    var duration = Math.random() * 8 + 6; // 6s to 14s (slower, floating)
    var swayDuration = Math.random() * 4 + 4; // 4s to 8s
    sf.style.animation = 'fall ' + duration + 's linear forwards, sway ' + swayDuration + 's ease-in-out infinite alternate';
    
    // Vary size significantly to create depth of field
    var sizePx = Math.random() * 12 + 8; // 8px to 20px
    if (Math.random() > 0.8) sizePx += Math.random() * 15; // larger out-of-focus snowflake
    
    sf.style.fontSize = sizePx + 'px';
    sf.style.opacity = Math.random() * 0.5 + 0.5; // Much more visible (0.5 to 1.0)
    document.body.appendChild(sf);
    
    setTimeout(function() {
      if(sf && sf.parentNode) sf.parentNode.removeChild(sf);
    }, duration * 1000);
  }
  
  setInterval(createSnowflake, 120); // Spawn them much faster
})();
