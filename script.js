"use strict";

document.documentElement.classList.add("js-enabled");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealTargets = document.querySelectorAll(".reveal");

function showPassedTargets() {
  revealTargets.forEach((el) => {
    if (el.getBoundingClientRect().bottom <= 0) {
      el.classList.add("is-visible");
    }
  });
}

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
  window.addEventListener("scroll", showPassedTargets, { passive: true });
  showPassedTargets();
}