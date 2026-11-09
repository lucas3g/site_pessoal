// Placar da abertura: cada clique em #moedaBtn soma uma moeda em #moedasTotal.
document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("moedaBtn");
  const total = document.getElementById("moedasTotal");
  if (!botao || !total) return;

  let moedas = 0;

  botao.addEventListener("click", () => {
    moedas++;
    total.textContent = String(moedas).padStart(2, "0");

    // alterna entre duas animações iguais para o quique reiniciar a cada clique
    botao.classList.toggle("quique-a", moedas % 2 === 1);
    botao.classList.toggle("quique-b", moedas % 2 === 0);
  });
});
