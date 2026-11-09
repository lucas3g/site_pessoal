// Pausa as animações contínuas (parallax, estrelas, letreiro) das áreas
// marcadas com data-pausar enquanto elas estão fora da tela.
document.addEventListener("DOMContentLoaded", () => {
  const areas = document.querySelectorAll("[data-pausar]");
  if (!areas.length || !("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      entrada.target.classList.toggle("fora-da-tela", !entrada.isIntersecting);
    });
  });

  areas.forEach((area) => observador.observe(area));
});
