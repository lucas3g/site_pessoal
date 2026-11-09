// Efeito de digitação na abertura: escreve e apaga cada termo de #digitacao.
document.addEventListener("DOMContentLoaded", () => {
  const alvo = document.getElementById("digitacao");
  if (!alvo) return;

  const termos = [
    "Flutter & Dart",
    "Android & iOS",
    "Software Architecture",
    "AI-Assisted Development",
    "Claude Code",
    "AI Agents",
    "MCP",
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    alvo.textContent = termos[0];
    return;
  }

  const PAUSA_CHEIO = 16;
  const PAUSA_VAZIO = 3;
  let indice = 0;
  let letras = 0;
  let direcao = 1;
  let espera = 0;

  setInterval(() => {
    if (espera > 0) {
      espera--;
      return;
    }

    letras += direcao;

    if (letras >= termos[indice].length) {
      letras = termos[indice].length;
      direcao = -1;
      espera = PAUSA_CHEIO;
    } else if (letras <= 0) {
      letras = 0;
      direcao = 1;
      indice = (indice + 1) % termos.length;
      espera = PAUSA_VAZIO;
    }

    alvo.textContent = termos[indice].slice(0, letras);
  }, 90);
});
