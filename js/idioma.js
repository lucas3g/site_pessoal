// Alterna o idioma da página (pt/en). Carregado no <head> para aplicar a
// classe no <html> antes da primeira pintura; os textos usam .pt e .en.
(function () {
  var CHAVE = "maktub-idioma";
  var raiz = document.documentElement;
  var atual = "pt";

  try {
    if (localStorage.getItem(CHAVE) === "en") atual = "en";
  } catch (erro) {}

  function aplicar(idioma) {
    atual = idioma === "en" ? "en" : "pt";
    raiz.classList.toggle("lang-en", atual === "en");
    raiz.classList.toggle("lang-pt", atual === "pt");
    raiz.lang = atual === "en" ? "en" : "pt-br";

    document.querySelectorAll("[data-idioma]").forEach(function (botao) {
      var ativo = botao.dataset.idioma === atual;
      botao.classList.toggle("ativo", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });
  }

  aplicar(atual);

  document.addEventListener("DOMContentLoaded", function () {
    aplicar(atual);

    document.querySelectorAll("[data-idioma]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        aplicar(botao.dataset.idioma);
        try {
          localStorage.setItem(CHAVE, atual);
        } catch (erro) {}
      });
    });
  });
})();
