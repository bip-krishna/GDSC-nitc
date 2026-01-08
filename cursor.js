const cursor = document.querySelector(".gdsc-cursor");
const ring = document.querySelector(".gdsc-cursor-ring");
const label = document.querySelector(".gdsc-cursor-label");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let lastX = 0, lastY = 0;

/* Track mouse */
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";

  const velocity = Math.min(
    Math.hypot(mouseX - lastX, mouseY - lastY) / 8,
    1.5
  );

  ring.style.transform =
    `translate(-50%, -50%) scale(${1 + velocity * 0.15})`;

  lastX = mouseX;
  lastY = mouseY;
});

/* Smooth follow */
function animate() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";

  label.style.left = ringX + "px";
  label.style.top = ringY + "px";

  requestAnimationFrame(animate);
}
animate();




/* Click ripple */
document.addEventListener("click", e => {
  const ripple = document.createElement("div");
  ripple.className = "gdsc-click";

  const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
  ripple.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";

  document.body.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
});
