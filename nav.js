// nav.js — Border Barrels sitewide navigation
document.addEventListener("DOMContentLoaded", () => {
  const header    = document.querySelector("header.site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu   = document.getElementById("nav-menu");

  // ── Scroll-shrink / elevated effect ──────────────────────────────
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load
  }

  // ── Hamburger toggle with morph animation ─────────────────────────
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link is clicked (mobile UX)
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        navMenu.classList.remove("show");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Active link highlight ─────────────────────────────────────────
  if (navMenu) {
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    navMenu.querySelectorAll("a").forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, "") || "/";
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  }
});
