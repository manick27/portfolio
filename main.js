document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav a");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const revealElements = document.querySelectorAll(".reveal");

  // ── Nav toggle ──
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => navMenu.classList.remove("open"));
    });
  }

  // ── Project filters ──
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const categories = card.dataset.category || "";
        const match = filter === "all" || categories.split(" ").includes(filter);
        card.classList.toggle("hide", !match);
      });
    });
  });

  // ── Scroll reveal ──
  const revealOnScroll = () => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add("visible");
      }
    });
  };
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll, { passive: true });

  // ── Active nav on scroll ──
  const sections = document.querySelectorAll("section[id]");
  const activateNavLink = () => {
    const scrollY = window.scrollY + 130;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const currentLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
      if (!currentLink) return;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        currentLink.classList.add("active");
      }
    });
  };
  activateNavLink();
  window.addEventListener("scroll", activateNavLink, { passive: true });
});
