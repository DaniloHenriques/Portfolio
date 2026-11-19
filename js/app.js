(function () {
  const { CATEGORY_LABELS, PROJECTS, LINKS } = window.PORTFOLIO;
  const IMG = "assets/img/";
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Peças reutilizadas ----------
  function coverMarkup(p, cls) {
    const c = p.cover;
    if (c.image) {
      // se a imagem ainda não existir, fica só o fundo
      return `<div class="${cls}" style="background:${c.bg || "#f5f5f5"}"><img class="cover-image" src="${IMG + c.image}" alt="" loading="lazy" onerror="this.remove()"></div>`;
    }
    if (!c.logo) return `<div class="${cls}" style="background:${c.bg || "#f5f5f5"}"></div>`;
    return `<div class="${cls}" style="background:${c.bg}"><img class="logo" src="${IMG + c.logo}" width="${c.w}" height="${c.h}" alt=""></div>`;
  }

  const metaMarkup = (items) => `<div class="meta">${items.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`;

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
    const { CONTACT } = window.PORTFOLIO;
    const chip = (t) => `<span class="chip">${esc(t)}</span>`;

    $("#about-link").href = LINKS.about;

    // Projetos agrupados por ano, do mais recente para o mais antigo
    const years = [...new Set(PROJECTS.filter((p) => p.year).map((p) => p.year))].sort((a, b) => b - a);
    $(".timeline").innerHTML = years
      .map(
        (y) => `
      <section class="year" aria-label="${y}">
        ${chip(y)}
        <div class="grid">
          ${PROJECTS.filter((p) => p.year === y)
            .map(
              (p) => `
            <a class="card" href="project.html?p=${encodeURIComponent(p.id)}">
              ${coverMarkup(p, "card-cover")}
              <span class="card-info">
                <span class="card-title">${esc(p.name)}</span>
                <span class="card-type">${esc(p.type || p.tags[0] || "")}</span>
              </span>
            </a>`
            )
            .join("")}
        </div>
      </section>`
      )
      .join("");

    // Seção final "Let's talk."
    $("#talk-title").textContent = CONTACT.title;
    $(".talk-text").textContent = CONTACT.text;
    $("#talk-contact").href = LINKS.contact;
    $(".talk-chips").innerHTML = CONTACT.chips.map(chip).join("");
    const photo = new Image();
    photo.alt = "Danilo Henriques";
    photo.onload = () => $(".talk-photo").appendChild(photo);
    photo.src = IMG + CONTACT.photo;

    // O botão de voltar ao topo desce do alto da tela só quando a página chega no fim.
    // Ele só "rearma" quando o lugar dele já saiu da tela, sem animação, para ninguém ver.
    const talk = $(".talk");
    const btnTop = $(".btn-top");
    let ticking = false;
    function updateBtnTop() {
      ticking = false;
      const r = talk.getBoundingClientRect();
      const vh = window.innerHeight;
      if (!talk.classList.contains("is-in")) {
        const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 2;
        if (atBottom) talk.classList.add("is-in");
        return;
      }
      // posição natural do botão (topo da seção + padding), ignorando a animação
      const top = r.top + parseFloat(getComputedStyle(talk).paddingTop);
      if (top > vh || top + btnTop.offsetHeight < 0) {
        btnTop.style.transition = "none";
        talk.classList.remove("is-in");
        void btnTop.offsetHeight; // aplica o reset antes de devolver a transição
        btnTop.style.transition = "";
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBtnTop);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateBtnTop();

    // Rolagem suave para os links internos (#contact, #top)
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", id === "top" ? location.pathname : "#" + id);
      })
    );
  }

  // ---------- PÁGINA DE PROJETO ----------
  function initProject() {
    const id = new URLSearchParams(location.search).get("p");
    const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];

    document.title = `${p.name} — Danilo Henriques`;
    $(".btn-back").href = "index.html";
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
