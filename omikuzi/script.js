"use strict";

document.documentElement.classList.add("js-enabled");

const omikujiResults = [
  {
    name: "大吉",
    message: "願事（ねがいごと）すべて叶う。初心を忘れず進むべし。"
  },
  {
    name: "中吉",
    message: "焦らず歩みを進めれば、道は自ずと開けるでしょう。"
  },
  {
    name: "小吉",
    message: "小さな喜びが、静かに積み重なっていく時です。"
  },
  {
    name: "吉",
    message: "落ち着いて過ごせば、穏やかな実りが訪れます。"
  },
  {
    name: "凶",
    message: "無理をせず、今は身を慎んで過ごすべき時です。"
  },
  {
    name: "大凶",
    message: "困難の後には、必ず静けさが訪れます。焦らずに。"
  }
];

const drawButton = document.getElementById("draw-button");
const redrawButton = document.getElementById("redraw-button");
const resultArea = document.getElementById("result-area");
const resultName = document.getElementById("result-name");
const resultMessage = document.getElementById("result-message");
const resultStamp = document.getElementById("result-stamp");

function drawOmikuji() {
  const randomIndex = Math.floor(Math.random() * omikujiResults.length);
  const selected = omikujiResults[randomIndex];

  resultName.textContent = selected.name;
  resultMessage.textContent = selected.message;

  resultName.classList.remove("is-best", "is-worst");
  if (selected.name === "大吉") {
    resultName.classList.add("is-best");
  } else if (selected.name === "大凶") {
    resultName.classList.add("is-worst");
  }

  resultStamp.classList.remove("is-stamped");
  void resultStamp.offsetWidth;
  resultStamp.classList.add("is-stamped");

  resultArea.hidden = false;
}

drawButton.addEventListener("click", () => {
  drawOmikuji();
  resultArea.scrollIntoView({ behavior: "smooth", block: "center" });
});

redrawButton.addEventListener("click", () => {
  drawOmikuji();
});

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
  const revealObserver = new IntersectionObserver(
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

  revealTargets.forEach((el) => revealObserver.observe(el));
  window.addEventListener("scroll", showPassedTargets, { passive: true });
  showPassedTargets();
}