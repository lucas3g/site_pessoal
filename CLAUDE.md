# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é

Site pessoal / portfólio de página única (Lucas Emanuel Silva — marca "Maktub"). HTML, CSS e JavaScript puros (vanilla), **sem build system, sem dependências npm e sem framework**. O único recurso externo é a fonte Google "Sora".

## Como rodar

Não há comandos de build, lint ou testes. Sirva os arquivos estáticos com qualquer servidor HTTP. O projeto está configurado para a extensão **Live Server** do VS Code na porta `5501` (`.vscode/settings.json`). Alternativa: `python3 -m http.server` na raiz e abrir `index.html`.

## Arquitetura de CSS (ponto crítico)

Existem duas cadeias de CSS e é fácil editar a errada:

- `css/style.css` importa 9 módulos parciais via `@import` (`header.css`, `global.css`, `introducao.css`, `experiencia.css`, `projetos.css`, `informacoes.css`, `footer.css`, `back-to-top.css`, `animations.css`). Estes arquivos parciais são a **fonte de edição**, organizados por seção do `index.html`.
- `css/style.min.css` é a versão minificada e concatenada de tudo — e é **o único CSS carregado pelo `index.html`**.

Não há ferramenta de minificação no repositório: `style.min.css` é gerado manualmente. Portanto, ao alterar estilos, edite o arquivo parcial correspondente em `css/` **e** replique a mudança em `css/style.min.css`, senão a alteração não aparecerá no site. `style.css` (o agregador com `@import`) não é referenciado por `index.html`.

## Estrutura da página

`index.html` é uma única página com seções ancoradas por id, na ordem: `header` → `introducao` (main) → `experiencia` → `projetos` → `informacoes` → `footer` (`#contato`). O menu do header navega por âncoras (`#experiencia`, etc.).

## JavaScript

Dois scripts independentes, sem dependências:

- `js/scroll-animations.js` — usa `IntersectionObserver` para revelar elementos ao rolar. Qualquer elemento com a classe `animar` (opcionalmente `animar-esquerda`, `animar-direita`, `animar-zoom` para a direção) começa oculto e recebe a classe `visivel` quando entra na viewport. Os estados/transições dessas classes estão em `animations.css`. Respeita `prefers-reduced-motion`. Para animar um novo elemento, basta adicionar a classe `animar` no HTML.
- `js/back-to-top.js` — controla a visibilidade do botão `#backToTopBtn` (aparece após 300px de scroll) e o scroll suave ao topo.

## Convenções

- Idioma do conteúdo e nomes de classes: **português** (`empresa`, `habilidades`, `formacao`, `introducao`, `subtitulo`).
- Ícones são SVG inline ou arquivos em `img/`. Vários ícones usam o gradiente `#grad-icon` definido inline no topo do `<body>`.
- Design responsivo baseado em breakpoints (principais: `max-width: 800px`, `1000px`, `480px`).
