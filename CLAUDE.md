# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é

Site pessoal / portfólio de página única (Lucas Emanuel Silva — marca "Maktub"), em estilo pixel art e bilíngue (pt/en). HTML, CSS e JavaScript puros (vanilla), **sem build system, sem dependências npm e sem framework**. Os únicos recursos externos são fontes do Google: "Press Start 2P" e "IBM Plex Mono" no `index.html`, e "Sora" nas páginas legais (`privacy.html`, `terms.html`).

## Como rodar

Não há comandos de build, lint ou testes. Sirva os arquivos estáticos com qualquer servidor HTTP. O projeto está configurado para a extensão **Live Server** do VS Code na porta `5501` (`.vscode/settings.json`). Alternativa: `python3 -m http.server` na raiz e abrir `index.html`.

## Arquitetura de CSS (ponto crítico)

Existem **dois temas**, cada um com parciais de edição e um `.min.css` que é o único arquivo carregado pela página. É fácil editar o arquivo errado:

- **Tema pixel (`index.html`)** — parciais em `css/pixel/` (`global.css`, `header.css`, `introducao.css`, `experiencia.css`, `projetos.css`, `informacoes.css`, `footer.css`, `back-to-top.css`, `animations.css`), agregados por `css/pixel.css` via `@import`. O `index.html` carrega apenas `css/pixel.min.css`.
- **Tema claro (`privacy.html`, `terms.html`)** — parciais na raiz de `css/` (incluindo `privacidade.css`), agregados por `css/style.css`. As páginas legais carregam apenas `css/style.min.css`. Os parciais de seção desse tema (`introducao.css`, `experiencia.css`, etc.) eram do `index.html` antigo e não são mais usados por nenhuma página.

Não há ferramenta de minificação no repositório: os `.min.css` são gerados manualmente. Ao alterar estilos, edite o parcial correspondente **e** replique a mudança no `.min.css` do mesmo tema (`pixel.min.css` ou `style.min.css`), senão a alteração não aparece no site. Os agregadores `pixel.css` e `style.css` não são referenciados por nenhuma página.

Cores e fontes do tema pixel são variáveis CSS em `css/pixel/global.css` (`--fundo`, `--linha`, `--ouro`, `--fonte-pixel`, `--fonte-texto`...). Componentes reutilizáveis ficam lá também: `.caixa` (painel com borda pixelada), `.botao`, `.etiqueta`, `.selo`, `.linha`, `.rotulo`, `.subtitulo`.

## Estrutura da página

`index.html` é uma única página com seções ancoradas por id, na ordem: `.abertura` (`#topo`: `header` + `introducao` (main) + `.cena` em parallax) → `.letreiro` → `experiencia` → `projetos` → `informacoes` → `footer` (`#contato`). O menu do header navega por âncoras (`#experiencia`, etc.).

**Idiomas:** todo texto traduzível aparece duas vezes, em `<span class="pt">` e `<span class="en">` (ou em blocos como `<ul class="... pt">`). O `<html>` recebe `lang-pt` ou `lang-en` e o CSS esconde o outro idioma. Ao adicionar texto, inclua sempre as duas versões.

## JavaScript

Scripts independentes, sem dependências:

- `js/idioma.js` — carregado no `<head>`. Aplica `lang-pt`/`lang-en` no `<html>`, liga os botões `[data-idioma]` e salva a escolha em `localStorage` (`maktub-idioma`).
- `js/scroll-animations.js` — usa `IntersectionObserver` para revelar elementos ao rolar. Só observa elementos com a classe `animar` (opcionalmente junto de `animar-esquerda`, `animar-direita`, `animar-zoom` para a direção); eles começam ocultos e recebem `visivel` ao entrar na viewport. Os estados ficam no `animations.css` de cada tema. Não coloque `animar` em um elemento que já tem `transform` ou animação própria (ex.: `.flutuante-1`): use um elemento envolvendo.
- `js/back-to-top.js` — controla a visibilidade do botão `#backToTopBtn` (aparece após 300px de scroll) e o scroll suave ao topo.
- `js/digitacao.js` — efeito de digitação em `#digitacao`; a lista de termos fica no próprio arquivo.
- `js/moedas.js` — placar da abertura (`#moedaBtn` soma em `#moedasTotal`).

As animações contínuas (parallax, personagem, moedas, estrelas, letreiro) são só CSS, com `@keyframes` em `css/pixel/animations.css`. Tudo respeita `prefers-reduced-motion`.

## Convenções

- Idioma dos nomes de classes: **português** (`empresa`, `habilidades`, `formacao`, `introducao`, `subtitulo`, `caixa`, `etiqueta`).
- Arte em pixel é SVG inline feito de retângulos (`<path>` com `h`/`v`), sempre com a classe `pixel`. Moeda e coração são `<symbol>` definidos no topo do `<body>` e usados com `<use>`.
- Design responsivo baseado em breakpoints (principais: `max-width: 800px`, `480px`) e grades `auto-fit`.
