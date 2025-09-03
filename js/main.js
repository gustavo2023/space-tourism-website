import { focusRovingNavigation } from "./tabs.js";

// DOM Elements
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const tabList = document.querySelector("[role='tablist']");

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");

  if (visibility === "false") {
    nav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    nav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

tabList.addEventListener("keydown", focusRovingNavigation);
