/**
 * Cart & WhatsApp Checkout Controller
 */

const Cart = {
  items: [],
  shopWhatsAppNumber: "6281234567890", // default fallback

  init(waNumber) {
    if (waNumber) {
      this.shopWhatsAppNumber = waNumber;
    }
    // Load from localStorage if available
    const saved = localStorage.getItem("komorebi_cart");
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        this.items = [];
      }
    }
    this.updateUI();
  },

  save() {
    localStorage.setItem("komorebi_cart", JSON.stringify(this.items));
  },

  addItem(name, price) {
    const existing = this.items.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ name, price, qty: 1 });
    }
    this.save();
    this.updateUI();
    App.showToast(`Ditambahkan: 1x ${name}`);
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
    App.showToast("Keranjang dikosongkan");
  },

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  updateUI() {
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();
    const formattedTotal = 'Rp ' + totalPrice.toLocaleString('id-ID');

    // DOM Elements
    const floatingBar = document.getElementById('wa-floating-bar');
    const waCount = document.getElementById('wa-item-count');
    const waPrice = document.getElementById('wa-total-price');
    const waPreview = document.getElementById('wa-items-preview');
    const headerCount = document.getElementById('header-cart-count');
    const navCartBtnText = document.getElementById('nav-cart-btn-text');

    if (headerCount) {
      headerCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    }
    if (navCartBtnText) {
      navCartBtnText.textContent = `Cart (${totalCount})`;
    }

    if (floatingBar && waCount && waPrice && waPreview) {
      if (totalCount > 0) {
        waCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
        waPrice.textContent = formattedTotal;
        waPreview.textContent = this.items.map(i => `${i.qty}x ${i.name}`).join(', ');

        floatingBar.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
      } else {
        floatingBar.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
      }
    }
  },

  checkoutWhatsApp() {
    if (this.items.length === 0) {
      App.showToast("Pilih menu terlebih dahulu!");
      return;
    }

    const orderList = this.items.map(item => `• ${item.qty}x ${item.name} (Rp ${(item.price * item.qty).toLocaleString('id-ID')})`).join('%0A');
    const totalPrice = this.getTotalPrice();
    const formattedTotal = 'Rp ' + totalPrice.toLocaleString('id-ID');

    const message = `Halo Komorebi Barista! 🌿%0A%0ASaya ingin memesan via website:%0A${orderList}%0A%0A*Total: ${formattedTotal}*%0A%0ATipe Pesanan: [Dine-In / Takeaway]%0ANama Pemesan: %0ANomor Meja (jika dine-in): %0ACatatan: `;
    const waUrl = `https://wa.me/${this.shopWhatsAppNumber}?text=${message}`;

    window.open(waUrl, '_blank');
  }
};

window.Cart = Cart;
