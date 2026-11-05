// =========================================================
// Portfolio scripts
// =========================================================

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === "light";
  themeToggle.setAttribute("aria-checked", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  try { localStorage.setItem("journey-theme", theme); } catch (error) {}
}

applyTheme(document.documentElement.dataset.theme || "dark");
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("open", !isOpen);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const filters = document.querySelectorAll(".collection-nav a");
const collections = document.querySelectorAll(".journey-board, .destination, .collection, .projects-band");

filters.forEach((filter) => {
  filter.addEventListener("click", (event) => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    collections.forEach((collection) => {
      collection.classList.toggle("filtered-out", category !== "all" && collection.dataset.category !== category);
    });
    if (category === "projects") {
      document.querySelector(".projects-band").classList.remove("filtered-out");
    }
    event.preventDefault();
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxButtons = [...document.querySelectorAll("[data-lightbox]")];
let activeImage = 0;

function showLightbox(index) {
  activeImage = (index + lightboxButtons.length) % lightboxButtons.length;
  const button = lightboxButtons[activeImage];
  const image = button.querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = button.dataset.caption || image.alt;
}

lightboxButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showLightbox(index);
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("open"));
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  window.setTimeout(() => { lightbox.hidden = true; }, 250);
}

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showLightbox(activeImage - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showLightbox(activeImage + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightbox(activeImage - 1);
  if (event.key === "ArrowRight") showLightbox(activeImage + 1);
});

document.querySelectorAll(".destination-gallery").forEach((gallery) => {
  let startX = 0;
  gallery.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].screenX;
  }, { passive: true });
  gallery.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].screenX - startX;
    if (Math.abs(distance) < 40) return;
    const visibleImages = gallery.querySelectorAll("[data-lightbox]");
    const firstImage = visibleImages[0];
    if (distance < 0) firstImage.click();
  }, { passive: true });
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".destination-hero img").forEach((image) => {
    const destination = image.closest(".destination");
    const rect = destination.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      image.style.transform = `translateY(${Math.max(-12, Math.min(12, rect.top / -18))}px) scale(1.04)`;
    }
  });
}, { passive: true });
