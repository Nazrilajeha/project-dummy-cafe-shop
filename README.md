# KOMOREBI • Minimalist Specialty Coffee Website

Website katalog digital dan pemesanan direct WhatsApp untuk portofolio coffee shop bergaya **Warm Japandi Minimalism**.

---

## 📁 Struktur Folder & File

```text
project/
├── index.html                   # Halaman utama website
├── README.md                    # Panduan ini
│
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS & animasi halus
│   │
│   ├── js/
│   │   ├── app.js               # Inisialisasi utama & toast notifications
│   │   ├── menu.js              # Render katalog, filter kategori, tag & search
│   │   └── cart.js              # State keranjang & pembuat link pesan WhatsApp
│   │
│   └── images/                  # 📸 TEMPAT TARUH FOTO LU SENDIRI
│       ├── placeholder.svg      # Kotak fallback otomatis jika foto belum dimasukkan
│       │
│       ├── hero/
│       │   └── hero-coffee.jpg  # Foto utama di banner atas
│       │
│       ├── menu/                # Foto-foto item menu (Rasio 4:3 direkomendasikan)
│       │   ├── menu-1.jpg       # Ethiopia Guji Uraga
│       │   ├── menu-2.jpg       # Kyoto Cold Drip
│       │   ├── menu-3.jpg       # Miso Caramel Latte
│       │   ├── menu-4.jpg       # Hojicha Cloud Flat White
│       │   ├── menu-5.jpg       # Colombia Pink Bourbon
│       │   └── menu-6.jpg       # Cardamom Sourdough Bun
│       │
│       └── ambience/            # Foto suasana tempat (Rasio 3:4 portrait)
│           ├── space-bar.jpg      # The Slow Bar
│           ├── space-outdoor.jpg  # Zen Courtyard
│           └── space-roastery.jpg # Roasting Atelier
│
└── data/                        # ⚙️ PUSAT EDIT DATA (Tanpa perlu ubah HTML)
    ├── store.json               # Info toko, nomor WhatsApp, alamat & jam buka
    └── menu.json                # Daftar menu, harga, tasting notes & kategori
```

---

## 🖼️ Cara Ganti Foto Sesuka Hati

Sistem sudah dilengkapi **Graceful Fallback**:
* Jika foto belum lu masukkan, web akan otomatis menampilkan kotak `placeholder.svg` bernuansa estetis, tanpa tampilan rusak atau link broken.
* **Untuk memasukkan foto lu:** Cukup copy file foto lu dan beri nama sesuai slot di atas (misal: `menu-1.jpg`, `hero-coffee.jpg`), lalu paste ke folder tujuannya di `assets/images/`.

---

## ☕ Cara Ubah Menu & Nomor WhatsApp

1. **Ubah Nomor WhatsApp Toko:**
   Buka file `data/store.json`, lalu ubah `"whatsappNumber"` ke nomor HP lu (gunakan format internasional tanpa tanda `+`, contoh: `6281234567890`).

2. **Tambah / Ubah Menu:**
   Buka file `data/menu.json`. Lu bisa ubah nama, harga, deskripsi, atau menambah menu baru dengan format yang sama.

---

## 🚀 Cara Menjalankan Website

* **Cara Termudah:** Cukup klik dua kali (*double-click*) file `index.html` untuk langsung membukanya di browser (Chrome, Edge, Safari).
* **Menggunakan Local Server (Opsional):**
  Jika lu punya Node.js terinstall:
  ```bash
  npx serve .
  ```
  Atau dengan Python:
  ```bash
  python -m http.server 3000
  ```
