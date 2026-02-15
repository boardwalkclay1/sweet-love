// Scene switching (for multi-page worlds like past.html)
const scenes = document.querySelectorAll(".scene");
const heartButtons = document.querySelectorAll(".heart-btn");
const smallNavButtons = document.querySelectorAll(".small-btn");

function goToScene(id) {
  scenes.forEach(s => s.classList.remove("scene-active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("scene-active");
  }
}

heartButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

smallNavButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

// HEART PARTICLE ANIMATION
const canvas = document.getElementById("heart-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let width, height;
function resize() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
if (canvas) {
  resize();
  window.addEventListener("resize", resize);
}

let hearts = [];
function createHeart() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 6 + Math.random() * 10,
    speed: 0.3 + Math.random() * 0.7,
    wobble: Math.random() * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.04,
    wobbleOffset: Math.random() * Math.PI * 2,
    color: Math.random() > 0.5 ? "#ff9aa2" : "#ffd1dc"
  };
}

if (canvas) {
  for (let i = 0; i < 80; i++) hearts.push(createHeart());

  function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-10, -8, -10, -20, 0, -14);
    ctx.bezierCurveTo(10, -20, 10, -8, 0, 6);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    hearts.forEach(h => {
      h.y -= h.speed;
      h.wobbleOffset += h.wobbleSpeed;
      const wobbleX = Math.sin(h.wobbleOffset) * h.wobble * 10;

      drawHeart(h.x + wobbleX, h.y, h.size, h.color);

      if (h.y + h.size < 0) {
        Object.assign(h, createHeart(), { y: height + 20 });
      }
    });

    requestAnimationFrame(loop);
  }
  loop();
}

// ACTIVATE ALL BACKGROUND PHOTOS
const bgPhotos = document.querySelectorAll(".bg-photo");
bgPhotos.forEach(p => p.classList.add("bg-active"));

// FALLING DECOR (flowers, teddy bears, candy)
const decorLayer = document.getElementById("decor-layer");
const decorItems = ["🌸", "🌹", "🧸", "🍫", "🍬", "💝"];

function spawnDecor() {
  if (!decorLayer) return;
  const el = document.createElement("div");
  el.className = "decor-item";
  el.textContent = decorItems[Math.floor(Math.random() * decorItems.length)];
  const startLeft = Math.random() * 100;
  el.style.left = startLeft + "vw";
  decorLayer.appendChild(el);

  const duration = 6 + Math.random() * 5;
  el.style.animation = `fallDecor ${duration}s linear forwards`;

  setTimeout(() => {
    decorLayer.removeChild(el);
  }, duration * 1000);
}

setInterval(spawnDecor, 1200);

// Decor CSS via JS-injected style (for falling animation)
const decorStyle = document.createElement("style");
decorStyle.innerHTML = `
  .decor-item {
    position: absolute;
    top: -40px;
    font-size: 1.8rem;
    text-shadow: 0 0 12px rgba(255, 182, 193, 0.9);
  }
  @keyframes fallDecor {
    0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
    50%  { transform: translateY(50vh) translateX(10px) rotate(20deg); opacity: 0.9; }
    100% { transform: translateY(110vh) translateX(-10px) rotate(-20deg); opacity: 0; }
  }
`;
document.head.appendChild(decorStyle);
