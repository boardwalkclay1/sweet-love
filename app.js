// Scene switching
const scenes = document.querySelectorAll(".scene");
const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const nextId = btn.dataset.next;
    if (!nextId) return;
    scenes.forEach(s => s.classList.remove("scene-active"));
    document.getElementById(nextId).classList.add("scene-active");
  });
});

// Scene 1: staggered floating photos (in, slow, then fall back)
const photos = document.querySelectorAll(".floating-photos .photo");

function animateIntroPhotos() {
  photos.forEach((photo, index) => {
    const delay = index * 800;

    setTimeout(() => {
      photo.style.transition = "transform 1.6s ease-out, opacity 1.6s ease-out";
      photo.style.opacity = "1";
      photo.style.transform = "translateY(0) scale(1)";
    }, delay);

    // After they slow down, fall backwards (scale down + fade)
    setTimeout(() => {
      photo.style.transition = "transform 2.2s ease-in, opacity 2.2s ease-in";
      photo.style.transform = "translateY(40px) scale(0.7)";
      photo.style.opacity = "0.2";
    }, delay + 2200);
  });
}

animateIntroPhotos();

// Scene 3: heart click messages
const heartCards = document.querySelectorAll(".heart-card");
const heartMessage = document.getElementById("heart-message");

heartCards.forEach(card => {
  card.addEventListener("click", () => {
    const msg = card.dataset.message;
    heartMessage.textContent = msg;
  });
});

// Simple heart confetti
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let hearts = [];
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createHeart() {
  return {
    x: Math.random() * width,
    y: -20,
    size: 8 + Math.random() * 10,
    speedY: 1 + Math.random() * 2,
    wobble: Math.random() * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.04,
    wobbleOffset: Math.random() * Math.PI * 2,
    color: Math.random() > 0.5 ? "#ff7ac4" : "#ffb6c1"
  };
}

for (let i = 0; i < 80; i++) {
  hearts.push(createHeart());
}

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

function confettiLoop() {
  ctx.clearRect(0, 0, width, height);

  hearts.forEach(h => {
    h.y += h.speedY;
    h.wobbleOffset += h.wobbleSpeed;
    const wobbleX = Math.sin(h.wobbleOffset) * h.wobble * 10;
    drawHeart(h.x + wobbleX, h.y, h.size, h.color);

    if (h.y - h.size > height) {
      Object.assign(h, createHeart(), { y: -20 });
    }
  });

  requestAnimationFrame(confettiLoop);
}
confettiLoop();
