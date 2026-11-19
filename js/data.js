// Conteúdo do portfólio. Para adicionar ou editar um projeto, mexa só neste arquivo.
//
// mode:       "design" ou "develop" — em qual modo da home o projeto aparece
// categories: usadas pelo menu "I design ___" (ver CATEGORIES abaixo)
// tags:       o texto pequeno que aparece embaixo do nome no card
// cover:      { bg, logo, w, h }  -> fundo colorido com logo centralizado
//             { image }           -> imagem ocupando o card inteiro (capas em assets/img/covers)
//             { bg }              -> só a cor de fundo (enquanto não há imagem)
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
    software: "Software",
  },

  // Ordem dos projetos = ordem na home (dentro de cada ano).
  PROJECTS: [
    {
      id: "globo",
      year: 2026,
      name: "Globo",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-globo.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "fundacao-itau",
      year: 2026,
      name: "Fundação Itaú",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-fundacao-itau.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "rock-encantech",
      year: 2026,
      name: "Rock Encantech",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-rock-encantech.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "youse",
      year: 2026,
      name: "Youse",
      type: "Design System & Website & App",
      mode: "design",
      categories: ["design-system", "website", "app"],
      tags: ["Design System", "Website", "App"],
      cover: { image: "covers/cover-youse.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "caju",
      year: 2025,
      name: "Caju",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-caju.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "gol-smiles",
      year: 2025,
      name: "GOL & Smiles",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-gol-smiles.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "estapar",
      year: 2025,
      name: "Estapar",
      type: "Design System & Website",
      mode: "design",
      categories: ["design-system", "website"],
      tags: ["Design System", "Website"],
      cover: { image: "covers/cover-estapar.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "ruler-ax",
      year: 2025,
      name: "Ruler",
      type: "Software",
      mode: "design",
      categories: ["software"],
      tags: ["Software"],
      cover: { bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "ruler-web",
      year: 2025,
      name: "Ruler",
      type: "Website",
      mode: "develop",
      categories: ["website"],
      tags: ["Website"],
      cover: { image: "covers/cover-ruler-web.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "brazil-conference",
      year: 2025,
      name: "Brazil Conference",
      type: "Website",
      mode: "design",
      categories: ["website"],
      tags: ["Website"],
      cover: { image: "covers/cover-brazil-conference.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "dsu",
      year: 2025,
      name: "DSU",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "scale-ops",
      year: 2024,
      name: "Scale Ops",
      type: "Software",
      mode: "design",
      categories: ["software"],
      tags: ["Software"],
      cover: { image: "covers/cover-scale-ops.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "rede-dor",
      year: 2024,
      name: "Rede D’Or",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "alelo",
      year: 2023,
      name: "Alelo",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { image: "covers/cover-alelo.jpg", bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "elo",
      year: 2023,
      name: "Elo",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "ambev-tech",
      year: 2022,
      name: "Ambev Tech",
      type: "Design System",
      mode: "design",
      categories: ["design-system"],
      tags: ["Design System"],
      cover: { bg: "#f5f5f5" },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "meiuca",
      name: "Meiuca",
      type: "Website",
      mode: "develop",
      categories: ["website"],
      tags: ["Design Studio", "Website"],
      cover: { bg: "#000000", logo: "logo-meiuca.svg", w: 88, h: 24 },
      texts: [LOREM, LOREM, LOREM],
      gallery: [],
    },
    {
      id: "cacau-do-futuro",
      name: "Cacau do Futuro",
      type: "Website",
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
