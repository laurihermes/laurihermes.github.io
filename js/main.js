// ============================================================
// GlobalCore — interações do site
// ============================================================

// ---------- Fundo: rede de partículas (conectividade) ----------
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const mouse = { x: null, y: null };
const LINK_DIST = 130;
const MOUSE_DIST = 180;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  const count = Math.min(110, Math.floor((w * h) / 14000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.5 + 0.5,
  }));
}

function tick() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 229, 255, 0.55)";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK_DIST) {
        ctx.strokeStyle = `rgba(79, 124, 255, ${(1 - d / LINK_DIST) * 0.28})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    if (mouse.x !== null) {
      const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (d < MOUSE_DIST) {
        ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - d / MOUSE_DIST) * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(tick);
}

window.addEventListener("resize", resize);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});
resize();
tick();

// ---------- Navbar ----------
const nav = document.getElementById("nav");
const navLinks = document.getElementById("nav-links");
const navToggle = document.getElementById("nav-toggle");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  })
);

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Contadores animados ----------
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const target = Number(el.dataset.target);
      const duration = 1600;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

// ---------- Efeito de digitação no console ----------
const typedEl = document.getElementById("typed");
const phrases = [
  "rastreando satélites... OK",
  "sincronizando rede IoT... OK",
  "compilando o futuro...",
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIdx];
  typedEl.textContent = phrase.slice(0, charIdx);

  if (!deleting && charIdx < phrase.length) {
    charIdx++;
    setTimeout(typeLoop, 55);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 2200);
  } else if (charIdx > 0) {
    charIdx--;
    setTimeout(typeLoop, 28);
  } else {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    setTimeout(typeLoop, 400);
  }
}
typeLoop();

// ---------- Ano no rodapé ----------
document.getElementById("year").textContent = new Date().getFullYear();
