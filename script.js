const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const year = document.querySelector("#year");
const faqButtons = document.querySelectorAll(".faq-item button");
const contactForm = document.querySelector(".contact-form");
const currentPage = document.body.dataset.page;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (currentPage) {
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.getAttribute("data-page-link") === currentPage) {
      link.classList.add("is-active");
    }
  });
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(
  ".section, .trust-band, .contact-section, .inner-hero, .service-card, .process-card, .project-card, .card-panel, .contact-form, .contact-info-card"
);

revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    rootMargin: "0px 0px -28% 0px",
    threshold: 0.32,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = contactForm.querySelector(".form-status");

    if (status) {
      status.textContent = "Talebiniz hazırlandı. En hızlı dönüş için +90 552 64 66 numarasını arayabilir veya WhatsApp üzerinden yazabilirsiniz.";
    }

    contactForm.reset();
  });
}
