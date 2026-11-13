# Portfolio — Danilo Henriques

Site de portfólio pessoal, construído a partir do design no Figma. HTML, CSS e JavaScript puros, sem build.

## Estrutura
- `index.html` — home com os modos **design** e **develop**, a frase com menus ("I design ___ for ___") e a grade de projetos
- `project.html?p=<id>` — página de um projeto, com seletor para trocar de projeto
- `js/data.js` — **todo o conteúdo**: projetos, categorias, textos, imagens e links. Para editar o site, normalmente só este arquivo
- `js/app.js` — comportamento (modos, menus, filtros, página de projeto)
- `css/style.css` — estilos
- `assets/img/` — logos, ícones e imagens

## Publicação
Cada push na branch `main` publica o site automaticamente no GitHub Pages
(workflow em `.github/workflows/deploy.yml`).
