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

const revealSelectors = [
  ".hero-copy",
  ".hero-card",
  ".intro-band__inner",
  ".trust-grid > *",
  ".section-heading",
  ".service-card",
  ".split__copy",
  ".process-card",
  ".showcase__image",
  ".showcase__content",
  ".contact-copy",
  ".contact-info-card",
  ".inner-hero__content",
  ".page-card",
  ".card-panel",
  ".project-card",
  ".faq-item"
];

document.querySelectorAll(revealSelectors.join(",")).forEach((item) => {
  item.classList.add("reveal");
});

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const revealStartDelay = 360;
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
  } else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  window.setTimeout(() => {
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
      observer.observe(item);
    });
  }, revealStartDelay);
  }
}

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
      status.textContent = "Talebiniz hazırlandı. En hızlı dönüş için +90 552 821 64 66 numarasını arayabilir veya WhatsApp üzerinden yazabilirsiniz.";
    }

    contactForm.reset();
  });
}
