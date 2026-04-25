const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("visivel");
    observerInstance.unobserve(entry.target);
  });
}, observerOptions);

const animarElements = document.querySelectorAll(".animar");
animarElements.forEach((element) => {
  observer.observe(element);
});
