// Conteúdo do portfólio. Para adicionar ou editar um projeto, mexa só neste arquivo.
//
// mode:       "design" ou "develop" — em qual modo da home o projeto aparece
// categories: usadas pelo menu "I design ___" (ver CATEGORIES abaixo)
// tags:       o texto pequeno que aparece embaixo do nome no card
// cover:      { bg, logo, w, h }  -> fundo colorido com logo centralizado
//             { image }           -> imagem ocupando o card inteiro
// texts:      as três colunas de texto da página do projeto
// gallery:    imagens da página do projeto (deixe [] para mostrar os blocos cinza)
// year:       ano em que o projeto aparece na home (sem year, o projeto não aparece na home)
// type:       texto embaixo do nome no card da home

const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966";

window.PORTFOLIO = {
  // Opções do primeiro menu ("I design ___" / "I develop ___"), por modo.
  // A opção com id "all" mostra todos os projetos do modo.
  CATEGORIES: {
    design: [
      { id: "all", label: "Products" },
      { id: "website", label: "Website" },
      { id: "design-system", label: "Design System" },
      { id: "app", label: "App" },
      { id: "ai", label: "Artificial Intelligence" },
    ],
    develop: [
      { id: "all", label: "Website on Framer" },
    ],
  },

  // Opções do segundo menu ("for ___"). Por enquanto só mudam a frase.
  AUDIENCES: [
    { id: "you", label: "You" },
    { id: "company", label: "Your Company" },
    { id: "startup", label: "Startups" },
    { id: "ecommerce", label: "E-commerce" },
  ],

  // Nomes legíveis das categorias, usados no seletor da página de projeto.
  CATEGORY_LABELS: {
    website: "Website",
    "design-system": "Design System",
    app: "App",
    ai: "Artificial Intelligence",
    landing: "Landing Page",
  },

  PROJECTS: [
    {
      id: "caju",
      year: 2026,
      type: "Design System",
      name: "Caju",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#e90039", logo: "logo-caju.svg", w: 48, h: 80 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "gol-smiles",
      year: 2026,
      type: "Design System",
      name: "GOL & Smiles",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#ff7020", logo: "logo-gol.svg", w: 99, h: 40 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "alelo",
      year: 2026,
      type: "Design System",
      name: "Alelo",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#008060", logo: "logo-alelo.svg", w: 80, h: 52 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "ruler-ax",
      year: 2025,
      type: "Agent Experience",
      name: "Ruler",
      mode: "design",
      categories: ["ai"],
      tags: ["Agent Experience"],
      cover: { image: "ruler-cover.png", bg: "#f7f7f7" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "youse",
      year: 2025,
      type: "Design System",
      name: "Youse",
      mode: "design",
      categories: ["design-system", "app"],
      tags: ["Design System Web/App", "App"],
      cover: { bg: "#ffce56", logo: "logo-youse.svg", w: 117, h: 24 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "estapar",
      year: 2025,
      type: "Design System",
      name: "Estapar",
      mode: "design",
      categories: ["design-system", "website"],
      tags: ["Design System Web", "Website"],
      cover: { bg: "#000000", logo: "logo-estapar.svg", w: 147, h: 40 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "meiuca",
      name: "Meiuca",
      mode: "develop",
      categories: ["website"],
      tags: ["Design Studio", "Website"],
      cover: { bg: "#000000", logo: "logo-meiuca.svg", w: 88, h: 24 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "ruler-web",
      name: "Ruler",
      mode: "develop",
      categories: ["website"],
      tags: ["Brand Studio", "Website"],
      cover: { image: "ruler-cover.png", bg: "#f7f7f7" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "cacau-do-futuro",
      name: "Cacau do Futuro",
      mode: "develop",
      categories: ["website"],
      tags: ["Startup", "Website"],
      cover: { bg: "#f4efe9", logo: "logo-cacau.svg", w: 59, h: 36 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
  ],

  // Links dos botões "About" e "Contact now".
  LINKS: {
    about: "#",
    contact: "#",
    profile: "#",
  },

  // Seção final da home ("Let's talk."), que ocupa a tela inteira depois dos cards.
  CONTACT: {
    title: "Let's talk.",
    text: LOREM + ",",
    photo: "danilo.jpg", // exporte a foto do Figma para assets/img/danilo.jpg
    chips: ["Open to freelancer only", "Product Design", "🇧🇷  Brazil"],
  },
};
