(() => {
  const header = document.querySelector(".site-header");
  const topButton = document.querySelector(".back-to-top");
  const year = document.querySelector("[data-year]");
  const revealItems = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = new Date().getFullYear();

  if (revealItems.length && "IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  let previousScroll = window.scrollY;
  let ticking = false;
  const updateScrollState = () => {
    const currentScroll = window.scrollY;
    if (header && currentScroll > 150) {
      header.classList.toggle("header-hidden", currentScroll > previousScroll + 4);
    } else if (header) {
      header.classList.remove("header-hidden");
    }
    if (topButton) topButton.classList.toggle("visible", currentScroll > 450);
    previousScroll = currentScroll;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
    });
  }
})();
