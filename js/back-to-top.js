document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("backToTopBtn");
  if (!backToTopButton) return;

  const TOGGLE_SCROLL_Y = 300;

  const updateButtonVisibility = () => {
    if (window.scrollY > TOGGLE_SCROLL_Y) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", updateButtonVisibility, { passive: true });
  updateButtonVisibility();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
