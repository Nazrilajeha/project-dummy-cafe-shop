/**
 * Main Application Orchestrator
 */

const App = {
  store: {
    brandName: "KOMOREBI",
    whatsappNumber: "6281234567890"
  },

  async init() {
    try {
      const res = await fetch("data/store.json");
      if (res.ok) {
        this.store = await res.json();
      }
    } catch (e) {
      console.log("Using default store configuration");
    }

    // Initialize modules
    Cart.init(this.store.whatsappNumber);
    Menu.init();

    // Bind newsletter toast
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = document.getElementById("dispatch-msg");
        if (msg) msg.classList.remove("hidden");
        this.showToast("Berhasil bergabung dengan Komorebi Dispatch!");
        newsletterForm.reset();
      });
    }
  },

  showToast(msg) {
    const toast = document.getElementById("toast-pill");
    const text = document.getElementById("toast-text");
    if (!toast || !text) return;

    text.textContent = msg;
    toast.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
    setTimeout(() => {
      toast.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
    }, 2500);
  },

  scrollToMenu() {
    const el = document.getElementById("menu-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

window.App = App;
