const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const ul = document.querySelector(".nav-menu");

// Stikcy navigation using intersection observer api for better performence.

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("header-sticky");
  else nav.classList.remove("header-sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

// page navigation scroll smoothly with event delegation
const sections = document.querySelectorAll("section");

ul.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });

    sections.forEach((section) => (section.style.paddingTop = "100px"));
  }
});

// fading animation with better performence

const allSections = document.querySelectorAll(".section");

const fadingSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(fadingSection, {
  root: null,
  threshold: 0.12,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// Mobile Menu
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".navigation");

const showMenu = () => {
  overlay.classList.add("show-menu");
};
const hideMenu = () => {
  overlay.classList.remove("show-menu");
};
mobileMenu.addEventListener("click", showMenu);
overlay.addEventListener("click", hideMenu);
