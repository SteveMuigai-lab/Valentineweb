document.addEventListener("DOMContentLoaded", () => {
  console.log("❤️ Valentine application loaded successfully");

  const heartsLayer = document.getElementById("hearts-layer");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const actions = document.getElementById("actions");
  const message = document.getElementById("message");
  const burstLayer = document.getElementById("burstLayer");

  const loveNote = document.getElementById("loveNote");
  const noteText = document.getElementById("noteText");

  // Floating hearts
  const symbols = ["❤️", "💖", "💕", "💗", "💓", "💝", "🌹"];
  const heartCount = 26;

  function createHeart() {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left = Math.random() * 100;
    const drift = (Math.random() * 60 - 30).toFixed(2) + "vw";
    const size = (14 + Math.random() * 26).toFixed(0) + "px";
    const duration = (14 + Math.random() * 18).toFixed(2) + "s";
    const delay = (Math.random() * 10).toFixed(2) + "s";

    el.style.left = left + "%";
    el.style.fontSize = size;
    el.style.animationDuration = duration;
    el.style.animationDelay = delay;
    el.style.setProperty("--x", drift);

    heartsLayer.appendChild(el);
  }

  for (let i = 0; i < heartCount; i++) createHeart();

  // “No” button playful dodge
  let noMoves = 0;

  function moveNoButton() {
    const cardRect = actions.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 8;
    const maxX = Math.max(padding, cardRect.width - btnRect.width - padding);
    const maxY = 70;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY - maxY / 2);

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    noMoves++;

    if (noMoves === 2) message.textContent = "Try again 😄";
    if (noMoves === 4) message.textContent = "No is being shy today 😂";
    if (noMoves === 6) message.textContent = "Okay… the answer is basically Yes 😅";
  }

  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      moveNoButton();
    },
    { passive: false }
  );

  noBtn.addEventListener("click", () => {
    message.textContent = "No worries 😌";
  });

  // Burst effect (emoji confetti)
  function burstEmojis() {
    const burst = document.createElement("div");
    burst.className = "burst";

    const particles = ["💖", "✨", "💞", "🌹", "💕", "💫"];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.textContent = particles[Math.floor(Math.random() * particles.length)];

      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 120;

      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;

      p.style.setProperty("--dx", `${dx.toFixed(1)}px`);
      p.style.setProperty("--dy", `${dy.toFixed(1)}px`);
      p.style.animationDelay = `${(Math.random() * 120).toFixed(0)}ms`;
      p.style.fontSize = `${16 + Math.random() * 18}px`;

      burst.appendChild(p);
    }

    burstLayer.appendChild(burst);
    setTimeout(() => burst.remove(), 1200);
  }

  // YES click (show message + keep effects)
  yesBtn.addEventListener("click", () => {
    message.textContent = "Yessss! 💖 You just made my day.";

    noteText.textContent =
      "You just made my heart smile 💖💞🌹✨ I’m so happy it’s YOU 😍🥰 Happy Valentines💕";

    loveNote.hidden = false;
    burstEmojis();

    noBtn.style.transform = "translate(0,0)";
    noBtn.style.opacity = "0.6";
    noBtn.style.pointerEvents = "none";
    yesBtn.classList.remove("animate-heartbeat");

    document.dispatchEvent(new CustomEvent("valentine-accepted"));
  });

  document.addEventListener("valentine-accepted", () => {
    console.log("🎉 Valentine accepted! Celebration triggered.");
  });
});