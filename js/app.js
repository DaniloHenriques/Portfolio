(function () {
  const { CATEGORIES, AUDIENCES, CATEGORY_LABELS, PROJECTS, LINKS } = window.PORTFOLIO;
  const IMG = "assets/img/";
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Peças reutilizadas ----------
  function coverMarkup(p, cls) {
    const c = p.cover;
    if (c.image) {
      return `<div class="${cls}" style="background:${c.bg || "#f7f7f7"}"><img class="cover-image" src="${IMG + c.image}" alt="" loading="lazy"></div>`;
    }
    return `<div class="${cls}" style="background:${c.bg}"><img class="logo" src="${IMG + c.logo}" width="${c.w}" height="${c.h}" alt=""></div>`;
  }

  const metaMarkup = (items) => `<div class="meta">${items.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`;

  function footerMarkup() {
    return `
      <div class="meta">
        <span>Hi, I'm <a class="name" href="${LINKS.profile}">Danilo Henriques</a></span>
        <span>Product Designer</span>
        <span>Open to freelancers only</span>
        <span>Living in Santos</span>
      </div>
      <a class="btn-contact" href="${LINKS.contact}">Contact now</a>`;
  }

  // ---------- Menus que expandem a pílula ----------
  // Um menu aberto por vez; clicar fora, no overlay ou apertar Esc fecha.
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
  let closeCurrent = null;

  function openMenu(pill, trigger, onClose) {
    if (closeCurrent) closeCurrent();
    pill.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    overlay.classList.add("is-visible");
    closeCurrent = () => {
      pill.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-visible");
      closeCurrent = null;
      if (onClose) onClose();
    };
  }
  overlay.addEventListener("click", () => closeCurrent && closeCurrent());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && closeCurrent) closeCurrent();
  });

  // ---------- HOME ----------
  function initHome() {
    const state = {
      mode: location.hash === "#develop" ? "develop" : "design",
      category: "all",
      audience: AUDIENCES[0].id,
    };

    const home = $(".home");
    const grid = $(".grid");
    const pill = $(".pill");
    const menuList = $(".pill-menu ul");
    const verb = $("#verb");
    const catTrigger = $("#category-trigger");
    const audTrigger = $("#audience-trigger");
    let openKind = null; // "category" | "audience"

    $(".footer").innerHTML = footerMarkup();

    function renderSentence() {
      verb.textContent = state.mode === "design" ? "I design" : "I develop";
      const cat = CATEGORIES[state.mode].find((c) => c.id === state.category);
      const aud = AUDIENCES.find((a) => a.id === state.audience);
      $(".label", catTrigger).textContent = cat.label;
      $(".label", audTrigger).textContent = aud.label;
      document.querySelectorAll(".mode-toggle button").forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.mode === state.mode));
      });
    }

    function renderGrid(animate) {
      const list = PROJECTS.filter(
        (p) => p.mode === state.mode && (state.category === "all" || p.categories.includes(state.category))
      );
      const html = list.length
        ? list
            .map(
              (p) => `
          <a class="card" href="project.html?p=${encodeURIComponent(p.id)}">
            ${coverMarkup(p, "card-cover")}
            <div class="card-info">
              <span class="card-title">${esc(p.name)}</span>
              ${metaMarkup(p.tags)}
            </div>
          </a>`
            )
            .join("")
        : `<p class="empty">Nenhum projeto nesta categoria ainda.</p>`;

      home.dataset.mode = state.mode;
      if (!animate) {
        grid.innerHTML = html;
        return;
      }
      grid.classList.add("is-leaving");
      setTimeout(() => {
        grid.innerHTML = html;
        grid.querySelectorAll(".card").forEach((c) => {
          c.style.opacity = "0";
          c.style.transform = "translateY(8px)";
        });
        grid.classList.remove("is-leaving");
        requestAnimationFrame(() =>
          grid.querySelectorAll(".card").forEach((c, i) => {
            c.style.transitionDelay = `${i * 40}ms`;
            c.style.opacity = "";
            c.style.transform = "";
          })
        );
      }, 200);
    }

    function fillMenu(kind) {
      const options = kind === "category" ? CATEGORIES[state.mode] : AUDIENCES;
      const current = kind === "category" ? state.category : state.audience;
      menuList.setAttribute("aria-labelledby", kind === "category" ? "category-trigger" : "audience-trigger");
      menuList.innerHTML = options
        .map(
          (o) =>
            `<li><button type="button" role="option" data-id="${o.id}" aria-selected="${o.id === current}">${esc(o.label)}</button></li>`
        )
        .join("");
    }

    function toggle(kind, trigger) {
      if (openKind === kind) {
        closeCurrent();
        return;
      }
      fillMenu(kind);
      openMenu(pill, trigger, () => (openKind = null));
      openKind = kind;
    }

    catTrigger.addEventListener("click", () => toggle("category", catTrigger));
    audTrigger.addEventListener("click", () => toggle("audience", audTrigger));

    menuList.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-id]");
      if (!btn) return;
      if (openKind === "category") {
        state.category = btn.dataset.id;
        renderGrid(true);
      } else {
        state.audience = btn.dataset.id;
      }
      renderSentence();
      closeCurrent();
    });

    document.querySelectorAll(".mode-toggle button").forEach((b) =>
      b.addEventListener("click", () => {
        if (b.dataset.mode === state.mode) return;
        state.mode = b.dataset.mode;
        state.category = "all";
        history.replaceState(null, "", "#" + state.mode);
        if (closeCurrent) closeCurrent();
        renderSentence();
        renderGrid(true);
      })
    );

    renderSentence();
    renderGrid(false);
  }

  // ---------- PÁGINA DE PROJETO ----------
  function initProject() {
    const id = new URLSearchParams(location.search).get("p");
    const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];

    document.title = `${p.name} — Danilo Henriques`;
    $(".btn-back").href = `index.html#${p.mode}`;
    $(".project-top .btn-contact").href = LINKS.contact;

    // Seletor de projeto (pílula do meio)
    const pill = $(".switcher");
    const trigger = $(".switcher-trigger");
    trigger.innerHTML = `${coverMarkup(p, "avatar")}<span>${esc(p.name)}</span><img class="chevron" src="${IMG}icon-chevron.svg" width="16" height="16" alt="">`;

    const groups = [
      { label: "Design", items: PROJECTS.filter((x) => x.mode === "design") },
      { label: "Develop", items: PROJECTS.filter((x) => x.mode === "develop") },
    ];
    $(".switcher .pill-menu ul").innerHTML = groups
      .map(
        (g) =>
          `<li class="group-label" role="presentation">${g.label}</li>` +
          g.items
            .map((x) => {
              const kinds = x.categories.map((c) => CATEGORY_LABELS[c] || c);
              return `<li><a href="project.html?p=${encodeURIComponent(x.id)}"${x.id === p.id ? ' aria-current="page"' : ""}>
                ${coverMarkup(x, "avatar")}
                <span class="item-text">
                  <span class="item-name">${esc(x.name)}</span>
                  ${metaMarkup([g.label, ...kinds])}
                </span>
              </a></li>`;
            })
            .join("")
      )
      .join("");

    trigger.addEventListener("click", () => {
      if (pill.classList.contains("is-open")) closeCurrent();
      else openMenu(pill, trigger);
    });

    // Conteúdo
    $(".project-title").textContent = p.name;
    $(".project-texts").innerHTML = p.texts.map((t) => `<p>${esc(t)}</p>`).join("");

    const imgs = p.gallery.length ? p.gallery : [null, null, null, null];
    let rows = "";
    for (let i = 0; i < imgs.length; i += 2) {
      const cell = (src) => `<div>${src ? `<img src="${IMG + src}" alt="" loading="lazy">` : ""}</div>`;
      rows += `<div class="gallery-row">${cell(imgs[i])}${cell(imgs[i + 1])}</div>`;
    }
    $(".gallery").innerHTML = rows;
  }

  if (document.body.dataset.page === "home") initHome();
  else if (document.body.dataset.page === "project") initProject();
})();
