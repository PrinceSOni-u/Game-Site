// ---------- game data ----------
const games = [
  {
    title: "Forgotten Forest",
    tag: "Adventure",
    tagClass: "tag-adventure",
    desc: "Explore the unknown and unravel the secrets of the forest.",
    size: "125 MB",
    grad: ["#1f3d2e", "#0f2018"],
    icon: "forest",
  },
  {
    title: "Astro Runner",
    tag: "Arcade",
    tagClass: "tag-arcade",
    desc: "Fast-paced space runner. How far can you go?",
    size: "98 MB",
    grad: ["#241a4a", "#100b28"],
    icon: "space",
  },
  {
    title: "Dungeon Depths",
    tag: "RPG",
    tagClass: "tag-rpg",
    desc: "Dive into the dungeon, defeat enemies, find loot.",
    size: "210 MB",
    grad: ["#3a1e1e", "#1c0e0e"],
    icon: "dungeon",
  },
];

const icons = {
  forest: `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4"><path d="M12 2 7 10h3l-4 7h4v3h4v-3h4l-4-7h3z"/></svg>`,
  space: `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4"><path d="M12 2c3 3 4 7 3 12l-3 3-3-3c-1-5 0-9 3-12z"/><circle cx="12" cy="9" r="1.5"/><path d="M9 16l-3 5M15 16l3 5"/></svg>`,
  dungeon: `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4"><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/><circle cx="12" cy="12" r="1.5"/></svg>`,
};

const gameGrid = document.getElementById("gameGrid");
gameGrid.innerHTML = games
  .map(
    (g) => `
    <div class="game-card">
      <div class="game-thumb" style="background:linear-gradient(150deg, ${g.grad[0]}, ${g.grad[1]});">
        ${icons[g.icon]}
      </div>
      <div class="game-body">
        <div class="game-title-row">
          <div class="game-title">${g.title}</div>
          <span class="tag ${g.tagClass}">${g.tag}</span>
        </div>
        <div class="game-desc">${g.desc}</div>
        <div class="game-foot">
          <span class="game-size">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>
            ${g.size}
          </span>
          <a href="#" class="dl-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 3v13M6 11l6 6 6-6M5 21h14"/></svg>
            Download
          </a>
        </div>
      </div>
    </div>
  `,
  )
  .join("");

// ---------- asset data ----------
const assets = [
  {
    name: "Low Poly Nature Pack",
    type: "3D Models",
    count: "45 Assets",
    grad: ["#1f3d2e", "#12241a"],
    icon: "tree",
  },
  {
    name: "Fantasy UI Kit",
    type: "UI",
    count: "28 Assets",
    grad: ["#241a4a", "#150f30"],
    icon: "ui",
  },
  {
    name: "Pixel Art Characters",
    type: "2D Assets",
    count: "32 Assets",
    grad: ["#3a2a12", "#1e1608"],
    icon: "char",
  },
  {
    name: "Weapon Pack",
    type: "3D Models",
    count: "20 Assets",
    grad: ["#3a1e1e", "#200f0f"],
    icon: "sword",
  },
];
const assetIcons = {
  tree: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><path d="M12 2 7 10h3l-4 7h4v3h4v-3h4l-4-7h3z"/></svg>`,
  ui: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 4v16"/></svg>`,
  char: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><circle cx="12" cy="8" r="3.2"/><path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/></svg>`,
  sword: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><path d="M14.5 3.5 20.5 9.5 12 18 6 20l2-6 8.5-8.5z"/><path d="M4 22l3-3"/></svg>`,
};

const assetGrid = document.getElementById("assetGrid");
assetGrid.innerHTML = assets
  .map(
    (a) => `
    <div class="asset-card">
      <div class="asset-thumb" style="background:linear-gradient(150deg, ${a.grad[0]}, ${a.grad[1]});">
        ${assetIcons[a.icon]}
      </div>
      <div class="asset-name">${a.name}</div>
      <div class="asset-type">${a.type}</div>
      <div class="asset-count">&gt; ${a.count}</div>
      <a href="#" class="asset-dl">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 3v13M6 11l6 6 6-6M5 21h14"/></svg>
        Download
      </a>
    </div>
  `,
  )
  .join("");

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
