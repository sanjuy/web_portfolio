const yearElement = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const heroScrollIndicator = document.querySelector(".hero-scroll");
const reduceMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(".reveal");

if (navToggle && mobileMenu) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
      return;
    }

    navToggle.setAttribute("aria-expanded", "true");
    mobileMenu.hidden = false;
    mobileMenu.classList.add("is-open");
    document.body.classList.add("nav-open");
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });
}

if ("IntersectionObserver" in window && !reduceMotionPreference.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

if (heroScrollIndicator) {
  const updateScrollIndicator = () => {
    heroScrollIndicator.classList.toggle("is-hidden", window.scrollY > 40);
  };

  updateScrollIndicator();
  window.addEventListener("scroll", updateScrollIndicator, { passive: true });
}
