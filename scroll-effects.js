const revealSections = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setListDelays() {
  document.querySelectorAll(".reveal-list").forEach((list) => {
    list.querySelectorAll("li").forEach((item, index) => {
      item.style.setProperty("--item-delay", `${(index + 1) * 120}ms`);
    });
  });
}

function showAll() {
  revealSections.forEach((section) => section.classList.add("is-visible"));
}

if (revealSections.length > 0) {
  setListDelays();

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    revealSections.forEach((section) => observer.observe(section));
  }
}
