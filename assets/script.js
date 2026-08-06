// assets/script.js — matrix background + small helpers (deferred)
(() => {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  let size = Math.max(12, Math.floor(Math.min(w, 18) / 1.3));
  let cols = Math.floor(w / size) + 1;
  let drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * h / size));

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    size = Math.max(12, Math.floor(Math.min(w, 18) / 1.3));
    cols = Math.floor(w / size) + 1;
    drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * h / size));
  }

  const chars = "01ﾊﾐﾋｰｳｼﾅﾓﾈﾃﾘｱｾｿﾝﾂｵｶﾂｸｻABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function randChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,255,163,0.92)';
    ctx.font = `${size}px monospace`;

    for (let i = 0; i < cols; i++) {
      const x = i * size;
      const y = drops[i] * size;
      ctx.fillText(randChar(), x, y);
      if (y > h && Math.random() > 0.97) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();

  // dynamic year fill
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // small performance hint: prefetch writeups route
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = '/writeups/';
  document.head.appendChild(link);
})();
