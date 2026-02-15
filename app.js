// Scene switching
const scenes = document.querySelectorAll(".scene");
const nextButtons = document.querySelectorAll(".next-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const heartButtons = document.querySelectorAll(".heart-btn");
const smallNavButtons = document.querySelectorAll(".small-btn");
const bgPhotos = document.querySelectorAll(".bg-photo");

function setWorldBackground(world) {
  // Clear all active photos
  bgPhotos.forEach(p => p.classList.remove("bg-active"));

  if (world === "past") {
    // photos 1–3
    document.querySelector(".bg-1")?.classList.add("bg-active");
    document.querySelector(".bg-2")?.classList.add("bg-active");
    document.querySelector(".bg-3")?.classList.add("bg-active");
  } else if (world === "present") {
    // photos 4–7
    document.querySelector(".bg-4")?.classList.add("bg-active");
    document.querySelector(".bg-5")?.classList.add("bg-active");
    document.querySelector(".bg-6")?.classList.add("bg-active");
    document.querySelector(".bg-7")?.classList.add("bg-active");
  } else if (world === "future") {
    // photos 8–10
    document.querySelector(".bg-8")?.classList.add("bg-active");
    document.querySelector(".bg-9")?.classList.add("bg-active");
    document.querySelector(".bg-10")?.classList.add("bg-active");
  } else {
    // intro / choice: all softly on
    bgPhotos.forEach(p => p.classList.add("bg-active"));
  }
}

function goToScene(id) {
  scenes.forEach(s => s.classList.remove("scene-active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("scene-active");
    const world = target.dataset.world || "intro";
    setWorldBackground(world);
  }
}

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

choiceButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

heartButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

smallNavButtons.forEach(btn => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

// Heart particle animation (unchanged)
const canvas = document.getElementById("heart-canvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

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
    color: Math.random() > 0.5 ? "#ff9a9e" : "#fecfef"
  };
}

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

// Initial background for intro
setWorldBackground("intro");
