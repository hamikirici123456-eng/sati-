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
      status.textContent = "Talebiniz hazırlandı. En hızlı dönüş için +90 0552 64 66 numarasını arayabilir veya WhatsApp üzerinden yazabilirsiniz.";
    }

    contactForm.reset();
  });
}
