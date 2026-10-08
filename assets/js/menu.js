/**
 * Menu Renderer & Filter Controller
 */

const Menu = {
  items: [],
  currentCategory: 'all',
  activeTags: new Set(),
  searchQuery: '',

  // Fallback data if file is opened via file:// protocol (CORS restriction)
  fallbackData: [
    {
      "id": "menu-1",
      "name": "Ethiopia Guji Uraga",
      "category": "manual-brew",
      "categoryLabel": "Manual Brew",
      "badge": "88.5 PTS",
      "price": 48000,
      "origin": "Guji Zone, Oromia • 2,150 MASL • Washed",
      "description": "Exquisite clarity with sparkling tea-like florality. Extracted slowly over Kalita Wave ceramic drippers for crystalline sweetness.",
      "profile": "Light Roast Profile",
      "flavors": ["Bergamot", "White Peach", "Jasmine Blossom"],
      "tags": ["vegan", "dairy-free"],
      "image": "assets/images/menu/menu-1.jpg"
    },
    {
      "id": "menu-2",
      "name": "Kyoto Cold Drip",
      "category": "manual-brew",
      "categoryLabel": "Slow Drip",
      "badge": "12-Hr Steep",
      "price": 45000,
      "origin": "Single Origin Sumatra Kerinci • Natural",
      "description": "Extracted one drop every three seconds through cold alkaline mountain water. Served over a hand-carved ice sphere.",
      "profile": "Velvety & Spirit-like",
      "flavors": ["Dark Chocolate", "Rum Raisin", "Orange Peel"],
      "tags": ["vegan", "dairy-free"],
      "image": "assets/images/menu/menu-2.jpg"
    },
    {
      "id": "menu-3",
      "name": "Miso Caramel Latte",
      "category": "signatures",
      "categoryLabel": "House Signature",
      "badge": "Barista Favorite",
      "price": 42000,
      "origin": "House Espresso • Fermented Shiro Miso",
      "description": "Double ristretto pulled over Kyoto white miso infused brown-butter reduction, gently textured with steamed minor figures oat milk.",
      "profile": "Warm Umami Hug",
      "flavors": ["White Miso Umami", "Oat Creaminess", "Smoked Salt"],
      "tags": ["dairy-free"],
      "image": "assets/images/menu/menu-3.jpg"
    },
    {
      "id": "menu-4",
      "name": "Hojicha Cloud Flat White",
      "category": "espresso",
      "categoryLabel": "Espresso & Tea",
      "badge": "Popular",
      "price": 40000,
      "origin": "Uji Roasted Bancha • Sweet Brazil Yellow Bourbon",
      "description": "Charcoal-roasted green tea whisked tableside, unified with a dense ristretto shot and micro-foamed milk for a nutty, soothing finish.",
      "profile": "Low Acidity",
      "flavors": ["Toasted Sesame", "Cedar Smoke", "Malted Milk"],
      "tags": [],
      "image": "assets/images/menu/menu-4.jpg"
    },
    {
      "id": "menu-5",
      "name": "Colombia Pink Bourbon",
      "category": "manual-brew",
      "categoryLabel": "Rare Varietal",
      "badge": "Aeropress / V60",
      "price": 55000,
      "origin": "Huila • Finca El Paraiso • Thermal Shock",
      "description": "A hyper-complex micro-lot fermented through anaerobic thermal shock. Vibrant tropical bouquet bursting with juicy acidity and floral finish.",
      "profile": "Sensory Highlight",
      "flavors": ["Pink Guava", "Lychee Jelly", "Hibiscus Tea"],
      "tags": ["vegan", "dairy-free"],
      "image": "assets/images/menu/menu-5.jpg"
    },
    {
      "id": "menu-6",
      "name": "Cardamom Sourdough Bun",
      "category": "bakery",
      "categoryLabel": "Nordic Bake",
      "badge": "Baked Daily 07:00",
      "price": 35000,
      "origin": "48-Hr Wild Sourdough • Cultured Butter",
      "description": "Hand-braided following traditional Stockholm baker’s knotting. Spiced with freshly ground green cardamom pods and topped with crunchy pearl sugar.",
      "profile": "Daily Small Batch",
      "flavors": ["Green Cardamom", "Wild Yeast Sour", "Pearl Sugar"],
      "tags": [],
      "image": "assets/images/menu/menu-6.jpg"
    }
  ],

  async init() {
    try {
      const res = await fetch("data/menu.json");
      if (!res.ok) throw new Error("Fetch failed");
      this.items = await res.json();
    } catch (e) {
      // Fallback for file:// or offline mode
      this.items = this.fallbackData;
    }

    this.bindEvents();
    this.render();
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById("menu-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Category pills
    const catButtons = document.querySelectorAll(".category-pill");
    catButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        catButtons.forEach(b => {
          b.classList.remove("bg-primary", "text-on-primary");
          b.classList.add("bg-surface-container", "text-on-surface");
        });
        btn.classList.remove("bg-surface-container", "text-on-surface");
        btn.classList.add("bg-primary", "text-on-primary");

        this.currentCategory = btn.getAttribute("data-cat");
        this.render();
      });
    });

    // Dietary tags
    const tagButtons = document.querySelectorAll(".tag-pill");
    tagButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-tag");
        if (this.activeTags.has(tag)) {
          this.activeTags.delete(tag);
          btn.classList.remove("bg-secondary", "text-on-secondary");
          btn.classList.add("bg-surface-container-low", "text-on-surface-variant");
        } else {
          this.activeTags.add(tag);
          btn.classList.remove("bg-surface-container-low", "text-on-surface-variant");
          btn.classList.add("bg-secondary", "text-on-secondary");
        }
        this.render();
      });
    });
  },

  render() {
    const grid = document.getElementById("menu-items-grid");
    if (!grid) return;

    const filtered = this.items.filter(item => {
      // Category match
      const matchCat = this.currentCategory === 'all' || item.category === this.currentCategory;

      // Dietary tags match
      let matchTags = true;
      if (this.activeTags.size > 0) {
        this.activeTags.forEach(tag => {
          if (!item.tags || !item.tags.includes(tag)) {
            matchTags = false;
          }
        });
      }

      // Search query match
      let matchSearch = true;
      if (this.searchQuery) {
        const searchText = `${item.name} ${item.origin} ${item.description} ${(item.flavors || []).join(' ')}`.toLowerCase();
        matchSearch = searchText.includes(this.searchQuery);
      }

      return matchCat && matchTags && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-on-surface-variant bg-surface rounded-xl border border-surface-container-high">
          <span class="material-symbols-outlined text-4xl text-outline mb-2">coffee</span>
          <p class="font-headline-sm text-primary">Tidak ada menu yang sesuai</p>
          <p class="font-body-sm text-sm mt-1">Coba gunakan kata kunci pencarian atau filter yang berbeda.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="menu-card bg-surface rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 border border-surface-container-high" data-category="${item.category}">
        <div class="space-y-space-md">
          <!-- Image with graceful fallback to placeholder.svg -->
          <div class="relative aspect-[4/3] rounded overflow-hidden bg-surface-container img-fallback-container">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              onerror="this.onerror=null; this.src='assets/images/placeholder.svg';"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md rounded font-label-sm text-label-sm text-primary uppercase shadow-sm">
              ${item.categoryLabel || item.category}
            </span>
            ${item.badge ? `
              <span class="absolute top-3 right-3 px-2 py-0.5 bg-secondary text-on-secondary rounded font-label-sm text-label-sm shadow-sm">
                ${item.badge}
              </span>
            ` : ''}
          </div>

          <div>
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="font-headline-sm text-headline-sm text-primary">${item.name}</h3>
              <span class="font-headline-sm text-headline-sm text-secondary shrink-0">Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">${item.origin || ''}</p>
          </div>

          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            ${item.description}
          </p>

          <!-- Flavor Chips -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${(item.flavors || []).map(f => `
              <span class="px-2 py-0.5 rounded font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed">
                ${f}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="pt-space-md mt-space-md flex items-center justify-between border-t border-surface-container-high/50">
          <span class="font-label-sm text-label-sm text-on-surface-variant">${item.profile || ''}</span>
          <button 
            type="button" 
            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary rounded font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
            onclick="Cart.addItem('${item.name.replace(/'/g, "\\'")}', ${item.price})"
          >
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add to Order</span>
          </button>
        </div>
      </article>
    `).join('');
  }
};

window.Menu = Menu;
