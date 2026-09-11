/* =========================================================
   YOUR CONTENT
   Add new games or assets by adding a new object to the
   matching array below. Nothing else needs to change —
   filters, counts and cards are all generated from this data.
   ========================================================= */

const games = [
  {
    title: "Nova Drift",
    description: "A short roguelite about steering a dying satellite home through an asteroid field, one jump at a time.",
    tags: ["Action", "Roguelite"],
    size: "142 MB",
    playUrl: "#",
    downloadUrl: "#"
  },
  {
    title: "Paperlight",
    description: "A quiet puzzle game where you fold light itself to guide a firefly through a sleeping house.",
    tags: ["Puzzle", "Relaxing"],
    size: "68 MB",
    playUrl: "#",
    downloadUrl: "#"
  },
  {
    title: "Undertow",
    description: "A two-button diving game about pacing your breath against the pull of the current.",
    tags: ["Arcade", "Action"],
    size: "94 MB",
    downloadUrl: "#"
  }
  // Add more games here, e.g.:
  // { title: "New Game", description: "...", tags: ["Genre"], size: "0 MB", downloadUrl: "#", playUrl: "#" }
];

const assets = [
  {
    title: "Low-poly Fox",
    category: "Characters",
    format: "FBX · OBJ · Blend",
    description: "Rigged, animation-ready low-poly fox with idle, walk and run cycles.",
    downloadUrl: "#"
  },
  {
    title: "Ruined Watchtower",
    category: "Environments",
    format: "FBX · Blend",
    description: "Modular stone tower kit with three broken-wall variants and a lichen texture set.",
    downloadUrl: "#"
  },
  {
    title: "Lantern Pack",
    category: "Props",
    format: "OBJ · GLTF",
    description: "Six hand-painted lantern props, lit and unlit texture variants included.",
    downloadUrl: "#"
  },
  {
    title: "Wandering Merchant",
    category: "Characters",
    format: "FBX · Blend",
    description: "Stylised NPC model with a modular pack of trade goods you can attach or remove.",
    downloadUrl: "#"
  }
  // Add more assets here, e.g.:
  // { title: "New Asset", category: "Props", format: "FBX", description: "...", downloadUrl: "#" }
];

/* =========================================================
   ICONS (inline SVG, reused per card)
   ========================================================= */
const ICONS = {
  controller: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9h12l2 7.5a2 2 0 0 1-3.6 1.6L15 16H9l-1.4 2.1A2 2 0 0 1 4 16.5L6 9Z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/><path d="M9 9V7m6 2V7"/></svg>`,
  cube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M4 7l8 4 8-4M12 11v10"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4.5v15l13-7.5-13-7.5Z"/></svg>`
};

/* =========================================================
   RENDER HELPERS
   ========================================================= */
function el(html){
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function thumbClass(index){
  return `thumb-${(index % 4) + 1}`;
}

function renderGameCard(game, index){
  const playBtn = game.playUrl
    ? `<a class="btn btn-primary btn-sm" href="${game.playUrl}" target="_blank" rel="noopener">${ICONS.play}Play</a>`
    : "";
  return el(`
    <article class="card glass">
      <div class="thumb ${thumbClass(index)}">${ICONS.controller}</div>
      <div class="card-body">
        <h3 class="card-title">${game.title}</h3>
        <p class="card-desc">${game.description}</p>
        <div class="tag-row">${game.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <p class="card-meta">${game.size}</p>
        <div class="card-actions">
          ${playBtn}
          <a class="btn btn-ghost btn-sm" href="${game.downloadUrl}" download>${ICONS.download}Download</a>
        </div>
      </div>
    </article>
  `);
}

function renderAssetCard(asset, index){
  return el(`
    <article class="card glass">
      <div class="thumb ${thumbClass(index)}">${ICONS.cube}</div>
      <div class="card-body">
        <h3 class="card-title">${asset.title}</h3>
        <p class="card-desc">${asset.description}</p>
        <p class="card-meta">${asset.format}</p>
        <div class="card-actions">
          <a class="btn btn-ghost btn-sm" href="${asset.downloadUrl}" download>${ICONS.download}Download</a>
        </div>
      </div>
    </article>
  `);
}

/* =========================================================
   FILTERABLE SECTION
   ========================================================= */
function setupSection({ data, groupKey, gridEl, filtersEl, emptyEl, renderCard, allLabel }){
  const groups = ["All", ...new Set(data.flatMap(item =>
    Array.isArray(item[groupKey]) ? item[groupKey] : [item[groupKey]]
  ))];

  let active = "All";

  function draw(){
    filtersEl.innerHTML = "";
    groups.forEach(g => {
      const chip = el(`<button type="button" class="filter-chip${g === active ? " active" : ""}">${g === "All" ? (allLabel || "All") : g}</button>`);
      chip.addEventListener("click", () => { active = g; draw(); });
      filtersEl.appendChild(chip);
    });

    const filtered = data.filter(item => {
      if (active === "All") return true;
      const val = item[groupKey];
      return Array.isArray(val) ? val.includes(active) : val === active;
    });

    gridEl.innerHTML = "";
    filtered.forEach((item, i) => gridEl.appendChild(renderCard(item, i)));

    emptyEl.hidden = filtered.length !== 0;
  }

  draw();
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  // --- Games section ---
  setupSection({
    data: games,
    groupKey: "tags",
    gridEl: document.getElementById("gameGrid"),
    filtersEl: document.getElementById("gameFilters"),
    emptyEl: document.getElementById("gameEmpty"),
    renderCard: renderGameCard
  });

  // --- Assets section ---
  setupSection({
    data: assets,
    groupKey: "category",
    gridEl: document.getElementById("assetGrid"),
    filtersEl: document.getElementById("assetFilters"),
    emptyEl: document.getElementById("assetEmpty"),
    renderCard: renderAssetCard
  });

  // --- Hero stats (auto-updates as you add content) ---
  const heroStats = document.getElementById("heroStats");
  heroStats.innerHTML = `
    <div><div class="stat-num">${games.length}</div><div class="stat-label">Games shipped</div></div>
    <div><div class="stat-num">${assets.length}</div><div class="stat-label">Assets available</div></div>
    <div><div class="stat-num">∞</div><div class="stat-label">More on the way</div></div>
  `;

  // --- Footer year ---
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Theme toggle ---
  // Starts from the visitor's system preference. This uses an in-memory
  // value rather than localStorage — if you want the choice to persist
  // across visits once this is hosted on your own domain, you can store
  // it with localStorage.setItem("theme", theme) / getItem on load.
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  let theme = prefersLight ? "light" : "dark";
  applyTheme(theme);

  themeBtn.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
  });

  function applyTheme(t){
    if (t === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    themeBtn.setAttribute("aria-pressed", String(t === "light"));
    themeBtn.setAttribute("aria-label", t === "light" ? "Switch to dark mode" : "Switch to light mode");
  }

  // --- Mobile nav ---
  const navLinks = document.getElementById("navLinks");
  const navBurger = document.getElementById("navBurger");

  navBurger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navBurger.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navBurger.setAttribute("aria-expanded", "false");
    });
  });
});
