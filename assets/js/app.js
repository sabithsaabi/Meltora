/**
 * Meltora — Modern E-Commerce & Interactive WhatsApp Bakery System
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // Owner Admin Configuration & Defaults
  // ==========================================
  const OWNER_PIN = "1234"; // 🔒 Secret 4-digit PIN (default: 1234 — change here as needed)
  const DEFAULT_PRODUCTS_BACKUP = JSON.parse(JSON.stringify(MELTORA_DATA.products));
  const DEFAULT_BANNER_HTML = "✨ Small batches baked fresh to order • Pre-orders now open for this week • Order directly on WhatsApp: <strong>+91 75590 22150</strong>";

  let isOwnerMode = false;

  // State
  let cart = [];
  try {
    const savedCart = localStorage.getItem("meltora_cart");
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
  }

  // Active filter state
  let currentCategory = "all";

  // Box Builder state
  let currentBoxModal = {
    boxSize: 4,
    boxProduct: null,
    selections: {
      "choco-melt": 0,
      "double-choco-melt": 0,
      "peanut-melt": 0,
      "nutella-melt": 0
    }
  };

  // DOM Elements
  const productsGrid = document.getElementById("products-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const whyGrid = document.getElementById("why-grid");
  const craftContainer = document.getElementById("craft-container");
  const instaGrid = document.getElementById("insta-grid");
  const reviewsGrid = document.getElementById("reviews-grid");
  const faqList = document.getElementById("faq-list");
  const preOrderSelect = document.getElementById("order-product-select");
  const preOrderForm = document.getElementById("preorder-form");

  // Cart DOM
  const cartBtn = document.getElementById("cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartCountBadges = document.querySelectorAll(".cart-count");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartCheckoutBtn = document.getElementById("cart-checkout-btn");

  // Box Builder Modal DOM
  const boxModalOverlay = document.getElementById("box-modal-overlay");
  const boxModalClose = document.getElementById("box-modal-close");
  const boxModalTitle = document.getElementById("box-modal-title");
  const boxCounterText = document.getElementById("box-counter-text");
  const boxFlavourList = document.getElementById("box-flavour-list");
  const boxConfirmBtn = document.getElementById("box-confirm-btn");

  // Mobile Menu DOM
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const mobileNavClose = document.getElementById("mobile-nav-close");

  // Owner Admin DOM
  const ownerPortalTrigger = document.getElementById("owner-portal-trigger");
  const ownerModalOverlay = document.getElementById("owner-pin-modal-overlay");
  const ownerPinClose = document.getElementById("owner-pin-close");
  const ownerPinInput = document.getElementById("owner-pin-input");
  const ownerPinForm = document.getElementById("owner-pin-form");
  const ownerPinError = document.getElementById("owner-pin-error");

  const ownerAdminBar = document.getElementById("owner-admin-bar");
  const ownerSaveBtn = document.getElementById("owner-save-btn");
  const ownerResetBtn = document.getElementById("owner-reset-btn");
  const ownerExitBtn = document.getElementById("owner-exit-btn");
  const announcementText = document.getElementById("announcement-text");
  const ownerBannerTag = document.getElementById("owner-banner-edit-tag");

  // Image Fallback Generator
  function getSvgFallback(text) {
    const cleanText = encodeURIComponent(text || "Meltora Brownie");
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%2326150c"/><circle cx="300" cy="200" r="130" fill="%233b2114"/><text x="50%" y="46%" font-family="Georgia,serif" font-size="28" fill="%23c2843a" text-anchor="middle" font-weight="bold">MELTORA</text><text x="50%" y="58%" font-family="sans-serif" font-size="16" fill="%23f2e9dc" text-anchor="middle">${cleanText}</text></svg>`;
  }

  // ==========================================
  // 1. Initial Render Functions
  // ==========================================

  function renderProducts(category = "all") {
    if (!productsGrid) return;
    const items = category === "all"
      ? MELTORA_DATA.products
      : MELTORA_DATA.products.filter(p => p.category === category);

    let html = items.map(product => {
      const isBox = product.category === "box";
      const isSoldOut = !!product.isSoldOut;
      const badgeHtml = product.badge
        ? `<span class="product-badge ${product.badgeType || 'gold'}">${product.badge}</span>`
        : "";

      const highlightsHtml = product.highlights
        ? `<div class="product-highlights">
             ${product.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join("")}
           </div>`
        : "";

      const intensityHtml = product.cocoaIntensity
        ? `<div class="intensity-meter">
             <span>Cocoa:</span>
             <div class="meter-track" title="Cocoa richness: ${product.cocoaIntensity}/10">
               ${Array.from({ length: 10 }).map((_, i) => `<span class="meter-dot ${i < product.cocoaIntensity ? 'filled' : ''}"></span>`).join("")}
             </div>
           </div>`
        : "";

      let actionBtnHtml = "";
      if (isOwnerMode) {
        actionBtnHtml = `
          <div class="owner-card-actions">
            <button type="button" class="owner-stock-toggle-btn ${isSoldOut ? 'btn-status-sold-out' : 'btn-status-in-stock'}" data-id="${product.id}" title="Click to toggle In Stock / Sold Out">
              <span class="stock-status-dot"></span>
              <span class="stock-status-text">${isSoldOut ? 'Sold Out' : 'In Stock'}</span>
              <span class="stock-toggle-action">⇄ Toggle</span>
            </button>
            <button type="button" class="owner-delete-btn" data-id="${product.id}" title="Remove this brownie from menu">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        `;
      } else if (isBox) {
        actionBtnHtml = `
          <button class="btn-order-link btn-open-builder" data-id="${product.id}">
            Customize Box →
          </button>
          <button class="btn-add-cart" data-id="${product.id}" title="Quick Add Assorted Box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        `;
      } else if (isSoldOut) {
        actionBtnHtml = `<span class="btn-sold-out">Sold Out</span>`;
      } else {
        actionBtnHtml = `
          <a href="#order" class="btn-order-link btn-direct-order" data-name="${product.name}">
            Order Now →
          </a>
          <button class="btn-add-cart" data-id="${product.id}" title="Add to Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        `;
      }

      const priceHtml = isOwnerMode
        ? `<div class="product-price owner-price-wrapper">
             <span class="owner-currency">₹</span>
             <input type="number" class="owner-price-input" data-id="${product.id}" value="${product.price}" min="1" step="1" title="Click to edit price directly" />
             <span class="price-unit">/ ${product.unit}</span>
           </div>`
        : `<div class="product-price">
             ₹${product.price} <span class="price-unit">/ ${product.unit}</span>
           </div>`;

      let cardBadgeHtml = badgeHtml;
      if (isOwnerMode) {
        cardBadgeHtml = isSoldOut
          ? `<span class="product-badge sold-out-badge">SOLD OUT</span>`
          : (badgeHtml || `<span class="product-badge in-stock-badge">IN STOCK</span>`);
      }

      const qvClass = isOwnerMode ? "" : "btn-open-quickview";
      const qvCursor = isOwnerMode ? "" : "cursor: pointer;";
      const qvTitle = isOwnerMode ? "" : "Click for details & tasting notes";

      const changeImgBtnHtml = isOwnerMode
        ? `<button type="button" class="btn-card-change-img" data-id="${product.id}" title="Change product photo">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
               <circle cx="12" cy="13" r="4"></circle>
             </svg>
             <span>Change Photo</span>
           </button>`
        : "";

      return `
        <article class="product-card ${isSoldOut ? 'sold-out' : ''}" data-id="${product.id}">
          <div class="product-img-wrap ${qvClass}" data-id="${product.id}" style="${qvCursor}" title="${qvTitle}">
            <img src="${product.image}" alt="${product.alt || product.name}" class="product-img" loading="lazy" onerror="this.onerror=null;this.src='${getSvgFallback(product.name)}'" />
            ${cardBadgeHtml}
            ${changeImgBtnHtml}
          </div>
          <div class="product-body">
            <h3 class="product-title ${qvClass}" data-id="${product.id}" style="${qvCursor}">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            ${intensityHtml}
            ${highlightsHtml}
            <div class="product-footer">
              ${priceHtml}
              <div class="product-actions">
                ${actionBtnHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    if (isOwnerMode) {
      html += `
        <article class="add-product-card" id="card-add-product" title="Click to add a new brownie to menu">
          <div class="add-product-inner">
            <div class="add-icon-circle">+</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-cocoa-900); margin: 0;">Add New Brownie</h3>
            <p style="font-size: 0.82rem; color: var(--color-text-muted); margin: 0;">Create a new recipe, filling, or gift box</p>
          </div>
        </article>
      `;
    }

    productsGrid.innerHTML = html;

    attachProductListeners();
  }

  function renderWhyUs() {
    if (!whyGrid) return;
    const iconSvgs = {
      sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
      clock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      gift: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M12 8v14"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`,
      scale: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
      heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
    };

    whyGrid.innerHTML = MELTORA_DATA.whyUs.map(card => `
      <div class="feature-card">
        <div class="feature-icon-wrap">
          ${iconSvgs[card.icon] || iconSvgs.sparkles}
        </div>
        <h3 class="feature-title">${card.title}</h3>
        <p class="feature-desc">${card.desc}</p>
      </div>
    `).join("");
  }

  function renderCraft() {
    if (!craftContainer) return;
    craftContainer.innerHTML = MELTORA_DATA.craftStories.map((story, idx) => {
      const isReverse = idx % 2 === 1;
      return `
        <div class="craft-row ${isReverse ? 'reverse' : ''}">
          <div class="craft-image-wrap">
            <img src="${story.image}" alt="${story.alt}" class="craft-img" loading="lazy" onerror="this.onerror=null;this.src='${getSvgFallback(story.title)}'" />
          </div>
          <div class="craft-content">
            <h3 class="craft-title">${story.title}</h3>
            <p class="craft-desc">${story.desc}</p>
            <ul class="craft-checklist">
              ${story.points.map(pt => `
                <li class="craft-check-item">
                  <span class="check-icon">✓</span>
                  <span>${pt}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderInstagram() {
    if (!instaGrid) return;
    instaGrid.innerHTML = MELTORA_DATA.instagramFeed.map(item => `
      <div class="insta-card">
        <img src="${item.image}" alt="${item.caption}" class="insta-img" loading="lazy" onerror="this.onerror=null;this.src='${getSvgFallback(item.tag)}'" />
        <div class="insta-overlay">
          <p class="insta-caption">${item.caption}</p>
          <span class="insta-tag">${item.tag}</span>
        </div>
      </div>
    `).join("");
  }

  function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = MELTORA_DATA.reviews.map(r => `
      <div class="review-card">
        <div>
          <div class="review-quote-icon">“</div>
          <p class="review-text">${r.text}</p>
        </div>
        <div class="review-author">
          <div class="author-avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="author-name">${r.name}</div>
            <div class="author-tag">${r.tag}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderFAQs() {
    if (!faqList) return;
    faqList.innerHTML = MELTORA_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span>${faq.question}</span>
          <span class="faq-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join("");

    // Accordion Toggle
    faqList.querySelectorAll(".faq-question").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const isActive = item.classList.contains("active");

        // Close others
        faqList.querySelectorAll(".faq-item").forEach(other => {
          other.classList.remove("active");
          other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
          item.classList.add("active");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function populateOrderSelect() {
    if (!preOrderSelect) return;
    const boxes = MELTORA_DATA.products.filter(p => p.category === "box");
    const singles = MELTORA_DATA.products.filter(p => p.category === "single");

    const boxOptions = boxes.map(b => `<option value="${b.name} (From ₹${b.price})">${b.name} (From ₹${b.price})</option>`).join("");
    const singleOptions = singles.map(s => {
      const stockStatus = s.isSoldOut ? " [SOLD OUT]" : "";
      return `<option value="${s.name} (₹${s.price}/pc)${stockStatus}" ${s.isSoldOut ? 'disabled' : ''}>${s.name} (₹${s.price}/pc)${stockStatus}</option>`;
    }).join("");

    preOrderSelect.innerHTML = `
      <option value="">Choose an option</option>
      <optgroup label="Gift & Celebration Boxes (Bespoke Kraft Box)">
        ${boxOptions}
      </optgroup>
      <optgroup label="Individual 75g Pure Fudge Brownies">
        ${singleOptions}
      </optgroup>
      <option value="Custom Assortment / Bulk Event Order">Custom Assortment / Bulk Event Order</option>
    `;
  }

  // ==========================================
  // 2. Filter Listeners
  // ==========================================

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderProducts(currentCategory);
    });
  });

  // ==========================================
  // 3. Cart Management
  // ==========================================

  function saveCart() {
    try {
      localStorage.setItem("meltora_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
    updateCartUI();
  }

  function addToCart(productId, customFlavours = null) {
    const product = MELTORA_DATA.products.find(p => p.id === productId);
    if (!product) return;

    // For custom box builds
    if (customFlavours) {
      const summaryFlavours = Object.entries(customFlavours)
        .filter(([_, count]) => count > 0)
        .map(([id, count]) => {
          const flv = MELTORA_DATA.flavours.find(f => f.id === id);
          return `${count}x ${flv ? flv.name : id}`;
        }).join(", ");

      const customItem = {
        cartId: `custom-box-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        isCustomBox: true,
        flavours: customFlavours,
        metaDesc: `Custom: ${summaryFlavours}`
      };
      cart.push(customItem);
      showToast(`Added ${product.name} to box! 🍫`);
    } else {
      // Standard item
      const existing = cart.find(item => item.productId === productId && !item.isCustomBox);
      if (existing) {
        existing.quantity += 1;
        showToast(`Updated ${product.name} quantity (${existing.quantity})`);
      } else {
        cart.push({
          cartId: `std-${productId}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          isCustomBox: false,
          metaDesc: product.weight ? `${product.weight} per piece` : "Artisanal Box"
        });
        showToast(`Added ${product.name} to cart! 🍫`);
      }
    }

    saveCart();
    openCart();
  }

  function updateCartUI() {
    // Badges count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? "flex" : "none";
    });

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `₹${subtotal}`;
    }

    // Render items list
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🍫</div>
          <p style="font-weight: 600; color: var(--color-cocoa-900); margin-bottom: 0.5rem;">Your Meltora bag is empty</p>
          <p style="font-size: 0.88rem;">Add your favourite molten brownies or curated kraft boxes to begin your pre-order.</p>
        </div>
      `;
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
      return;
    }

    if (cartCheckoutBtn) cartCheckoutBtn.disabled = false;

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item" data-cart-id="${item.cartId}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='${getSvgFallback(item.name)}'" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.metaDesc}</div>
          <div class="cart-item-bottom">
            <div class="cart-qty-ctrl">
              <button class="qty-btn btn-qty-dec" data-id="${item.cartId}">−</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn btn-qty-inc" data-id="${item.cartId}">+</button>
            </div>
            <div class="cart-item-price">₹${item.price * item.quantity}</div>
          </div>
        </div>
      </div>
    `).join("");

    // Attach quantity click handlers
    cartItemsList.querySelectorAll(".btn-qty-inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const item = cart.find(i => i.cartId === id);
        if (item) {
          item.quantity += 1;
          saveCart();
        }
      });
    });

    cartItemsList.querySelectorAll(".btn-qty-dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const index = cart.findIndex(i => i.cartId === id);
        if (index > -1) {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
          saveCart();
        }
      });
    });
  }

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // ==========================================
  // 4. Box Customizer Modal
  // ==========================================

  function openBoxBuilder(productId) {
    const product = MELTORA_DATA.products.find(p => p.id === productId);
    if (!product || !product.boxSize) return;

    currentBoxModal.boxSize = product.boxSize;
    currentBoxModal.boxProduct = product;
    // reset selection with dynamic flavour keys
    currentBoxModal.selections = {};
    MELTORA_DATA.flavours.forEach(f => {
      currentBoxModal.selections[f.id] = 0;
    });

    if (boxModalTitle) {
      boxModalTitle.textContent = `Customize ${product.name}`;
    }

    renderBoxBuilderFlavours();
    if (boxModalOverlay) boxModalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeBoxBuilder() {
    if (boxModalOverlay) boxModalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderBoxBuilderFlavours() {
    if (!boxFlavourList) return;

    const currentTotal = Object.values(currentBoxModal.selections).reduce((a, b) => a + b, 0);
    const targetSize = currentBoxModal.boxSize;
    const remaining = targetSize - currentTotal;

    if (boxCounterText) {
      boxCounterText.innerHTML = `Selected: <strong>${currentTotal} of ${targetSize}</strong> pieces ${remaining === 0 ? "🎉 (Box complete!)" : `(${remaining} remaining)`
        }`;
    }

    if (boxConfirmBtn) {
      boxConfirmBtn.disabled = currentTotal !== targetSize;
      boxConfirmBtn.textContent = currentTotal === targetSize
        ? `Add Complete Box to Cart (₹${currentBoxModal.boxProduct.price})`
        : `Select ${remaining} more piece${remaining > 1 ? 's' : ''}`;
    }

    boxFlavourList.innerHTML = MELTORA_DATA.flavours.map(f => {
      const count = currentBoxModal.selections[f.id] || 0;
      return `
        <div class="flavour-row">
          <div class="flavour-info">
            <div class="flavour-name">${f.name}</div>
            <div class="flavour-sub">${f.subtitle}</div>
          </div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn btn-flavour-dec" data-flavour="${f.id}" ${count <= 0 ? 'disabled' : ''}>−</button>
            <span class="qty-num">${count}</span>
            <button class="qty-btn btn-flavour-inc" data-flavour="${f.id}" ${currentTotal >= targetSize ? 'disabled' : ''}>+</button>
          </div>
        </div>
      `;
    }).join("");

    // Listeners for flavour +/-
    boxFlavourList.querySelectorAll(".btn-flavour-inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.flavour;
        const curTot = Object.values(currentBoxModal.selections).reduce((a, b) => a + b, 0);
        if (curTot < currentBoxModal.boxSize) {
          currentBoxModal.selections[id] = (currentBoxModal.selections[id] || 0) + 1;
          renderBoxBuilderFlavours();
        }
      });
    });

    boxFlavourList.querySelectorAll(".btn-flavour-dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.flavour;
        if ((currentBoxModal.selections[id] || 0) > 0) {
          currentBoxModal.selections[id] -= 1;
          renderBoxBuilderFlavours();
        }
      });
    });
  }

  if (boxModalClose) boxModalClose.addEventListener("click", closeBoxBuilder);
  if (boxModalOverlay) {
    boxModalOverlay.addEventListener("click", (e) => {
      if (e.target === boxModalOverlay) closeBoxBuilder();
    });
  }

  if (boxConfirmBtn) {
    boxConfirmBtn.addEventListener("click", () => {
      const curTot = Object.values(currentBoxModal.selections).reduce((a, b) => a + b, 0);
      if (curTot === currentBoxModal.boxSize) {
        addToCart(currentBoxModal.boxProduct.id, { ...currentBoxModal.selections });
        closeBoxBuilder();
      }
    });
  }

  // ==========================================
  // 5. Product Click Handlers
  // ==========================================

  function attachProductListeners() {
    if (!productsGrid) return;

    if (isOwnerMode) {
      // Owner Mode: Price input listener
      productsGrid.querySelectorAll(".owner-price-input").forEach(input => {
        input.addEventListener("input", (e) => {
          const id = e.target.dataset.id;
          const val = parseInt(e.target.value, 10);
          if (!isNaN(val) && val > 0) {
            const prod = MELTORA_DATA.products.find(p => p.id === id);
            if (prod) prod.price = val;
          }
        });
      });

      // Owner Mode: Stock toggle button listener
      productsGrid.querySelectorAll(".owner-stock-toggle-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          syncInputsToData();
          const id = btn.dataset.id;
          const prod = MELTORA_DATA.products.find(p => p.id === id);
          if (!prod) return;

          prod.isSoldOut = !prod.isSoldOut;
          if (prod.isSoldOut) {
            prod._prevBadge = prod.badge;
            prod.badge = "SOLD OUT";
            prod.badgeType = "dark";
          } else {
            prod.badge = prod._prevBadge || (prod.category === "box" ? `FROM ₹${prod.price}` : "");
            prod.badgeType = "gold";
          }

          renderProducts(currentCategory);
        });
      });

      // Owner Mode: Change Image button listener
      productsGrid.querySelectorAll(".btn-card-change-img").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          syncInputsToData();
          openChangeImgModal(btn.dataset.id);
        });
      });

      // Owner Mode: Delete Product button listener
      productsGrid.querySelectorAll(".owner-delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          syncInputsToData();
          deleteProduct(btn.dataset.id);
        });
      });

      // Owner Mode: Add Product Card listener
      const addCard = productsGrid.querySelector("#card-add-product");
      if (addCard) {
        addCard.addEventListener("click", (e) => {
          e.preventDefault();
          syncInputsToData();
          openAddProductModal();
        });
      }

      return;
    }

    // Customer mode listeners:
    // Add to cart buttons
    productsGrid.querySelectorAll(".btn-add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const prod = MELTORA_DATA.products.find(p => p.id === id);
        if (prod && prod.category === "box") {
          // Open builder for box
          openBoxBuilder(id);
        } else {
          addToCart(id);
        }
      });
    });

    // Customize Box buttons
    productsGrid.querySelectorAll(".btn-open-builder").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openBoxBuilder(btn.dataset.id);
      });
    });

    // Quick View triggers
    productsGrid.querySelectorAll(".btn-open-quickview").forEach(el => {
      el.addEventListener("click", () => {
        openQuickView(el.dataset.id);
      });
    });

    // Direct Order Now links (scroll to form and pre-fill)
    productsGrid.querySelectorAll(".btn-direct-order").forEach(link => {
      link.addEventListener("click", (e) => {
        const prodName = link.dataset.name;
        if (preOrderSelect) {
          for (let opt of preOrderSelect.options) {
            if (opt.text.toLowerCase().includes(prodName.toLowerCase())) {
              preOrderSelect.value = opt.value;
              break;
            }
          }
        }
      });
    });
  }

  // ==========================================
  // 6. WhatsApp Checkout & Pre-Order Generator
  // ==========================================

  function checkoutCartViaWhatsApp() {
    if (cart.length === 0) return;

    let itemsText = cart.map((item, idx) => {
      if (item.isCustomBox && item.flavours) {
        const flvText = Object.entries(item.flavours)
          .filter(([_, count]) => count > 0)
          .map(([id, count]) => {
            const f = MELTORA_DATA.flavours.find(x => x.id === id);
            return `   • ${f ? f.name : id}: ${count} pcs`;
          }).join("\n");
        return `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}\n${flvText}`;
      }
      return `${idx + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`;
    }).join("\n\n");

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const message = `🍫 *NEW PRE-ORDER — MELTORA* 🍫\n\n` +
      `Hello Meltora! I would like to place a pre-order from your website:\n\n` +
      `*ORDER SUMMARY:*\n${itemsText}\n\n` +
      `*ESTIMATED TOTAL:* ₹${total}\n\n` +
      `Please let me know your available pre-order dates and delivery details! Thank you ✨`;

    const whatsappUrl = `https://wa.me/${MELTORA_DATA.brand.phoneClean}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", checkoutCartViaWhatsApp);
  }

  // Form submit handler
  if (preOrderForm) {
    preOrderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("order-name")?.value.trim() || "";
      const phone = document.getElementById("order-phone")?.value.trim() || "";
      const email = document.getElementById("order-email")?.value.trim() || "";
      const address = document.getElementById("order-address")?.value.trim() || "";
      const pincode = document.getElementById("order-pincode")?.value.trim() || "";
      const product = preOrderSelect?.value || "";
      const notes = document.getElementById("order-notes")?.value.trim() || "";

      if (!name || !phone || !product) {
        alert("Please provide your name, WhatsApp number, and selected brownie box.");
        return;
      }

      const message = `🍫 *MELTORA PRE-ORDER REQUEST* 🍫\n\n` +
        `*Name:* ${name}\n` +
        `*WhatsApp Phone:* ${phone}\n` +
        (email ? `*Email:* ${email}\n` : "") +
        `*Selected Order:* ${product}\n` +
        (address ? `*Delivery Area/City:* ${address}\n` : "") +
        (pincode ? `*Pincode:* ${pincode}\n` : "") +
        (notes ? `*Preferred Date & Flavours:* ${notes}\n\n` : "\n") +
        `Sent via Meltora Website. Looking forward to your confirmation!`;

      const whatsappUrl = `https://wa.me/${MELTORA_DATA.brand.phoneClean}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      showToast("Opening WhatsApp with your order details...");
    });
  }

  // ==========================================
  // 7. Toast Notifications
  // ==========================================

  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>🍫</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ==========================================
  // 8. Sticky Header & Mobile Drawer
  // ==========================================

  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNavDrawer.classList.toggle("open");
    });
  }

  if (mobileNavClose && mobileNavDrawer) {
    mobileNavClose.addEventListener("click", () => {
      mobileNavDrawer.classList.remove("open");
    });
  }

  // Close mobile drawer on link click
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileNavDrawer?.classList.remove("open");
    });
  });

  // ==========================================
  // 9. Menu Poster Lightbox
  // ==========================================
  const openPosterBtn = document.getElementById("open-poster-btn");
  const posterModalOverlay = document.getElementById("poster-modal-overlay");
  const posterModalClose = document.getElementById("poster-modal-close");

  if (openPosterBtn && posterModalOverlay) {
    openPosterBtn.addEventListener("click", () => {
      posterModalOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (posterModalClose && posterModalOverlay) {
    posterModalClose.addEventListener("click", () => {
      posterModalOverlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  if (posterModalOverlay) {
    posterModalOverlay.addEventListener("click", (e) => {
      if (e.target === posterModalOverlay) {
        posterModalOverlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // ==========================================
  // 10. Product Quick-View Modal
  // ==========================================
  let activeQuickViewId = null;
  const qvOverlay = document.getElementById("quick-view-overlay");
  const qvClose = document.getElementById("quick-view-close");
  const qvAddBtn = document.getElementById("qv-add-cart-btn");
  const qvOrderBtn = document.getElementById("qv-order-direct-btn");

  function openQuickView(productId) {
    const p = MELTORA_DATA.products.find(x => x.id === productId);
    if (!p) return;
    activeQuickViewId = productId;

    const imgEl = document.getElementById("qv-img");
    if (imgEl) {
      imgEl.src = p.image;
      imgEl.alt = p.name;
    }
    const badgeEl = document.getElementById("qv-badge");
    if (badgeEl) badgeEl.textContent = p.badge || (p.weight ? `${p.weight} piece` : "Specialty");
    const titleEl = document.getElementById("qv-title");
    if (titleEl) titleEl.textContent = p.name;
    const priceEl = document.getElementById("qv-price");
    if (priceEl) priceEl.textContent = `₹${p.price} / ${p.unit}`;
    const descEl = document.getElementById("qv-desc");
    if (descEl) descEl.textContent = p.desc;
    const weightEl = document.getElementById("qv-weight");
    if (weightEl) weightEl.textContent = p.weight ? `${p.weight} pure fudge` : "Curated Gift Box";
    const ingEl = document.getElementById("qv-ingredients");
    if (ingEl) ingEl.textContent = p.ingredients || "Real Callebaut cocoa, pure butter, farm eggs, cane sugar, flour.";
    const allEl = document.getElementById("qv-allergens");
    if (allEl) allEl.textContent = p.allergens || "Check packaging for specifics.";
    const reheatEl = document.getElementById("qv-reheat-text");
    if (reheatEl) reheatEl.textContent = p.reheatTip || "Microwave 15–20s for flowing molten center.";

    if (qvOverlay) {
      qvOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeQuickView() {
    if (qvOverlay) {
      qvOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (qvClose) qvClose.addEventListener("click", closeQuickView);
  if (qvOverlay) {
    qvOverlay.addEventListener("click", (e) => {
      if (e.target === qvOverlay) closeQuickView();
    });
  }

  if (qvAddBtn) {
    qvAddBtn.addEventListener("click", () => {
      if (activeQuickViewId) {
        const prod = MELTORA_DATA.products.find(x => x.id === activeQuickViewId);
        if (prod && prod.category === "box") {
          closeQuickView();
          openBoxBuilder(activeQuickViewId);
        } else {
          addToCart(activeQuickViewId);
          closeQuickView();
        }
      }
    });
  }

  if (qvOrderBtn) {
    qvOrderBtn.addEventListener("click", () => {
      closeQuickView();
      if (preOrderSelect && activeQuickViewId) {
        const prod = MELTORA_DATA.products.find(x => x.id === activeQuickViewId);
        if (prod) {
          for (let opt of preOrderSelect.options) {
            if (opt.text.toLowerCase().includes(prod.name.toLowerCase())) {
              preOrderSelect.value = opt.value;
              break;
            }
          }
        }
      }
    });
  }

  // ==========================================
  // 11. Flavour Profile Guide
  // ==========================================
  function renderFlavourGuide() {
    const grid = document.getElementById("flavour-matrix-grid");
    if (!grid) return;

    grid.innerHTML = MELTORA_DATA.flavours.map(f => {
      const prod = MELTORA_DATA.products.find(p => p.id === f.id) || {};
      const img = prod.image || "assets/images/choco-melt-hd.jpg";
      const cocoaPct = (f.cocoa || 7) * 10;
      const sweetPct = (f.sweetness || 6) * 10;

      return `
        <div class="flavour-matrix-card">
          <div class="fmc-header">
            <img src="${img}" alt="${f.name}" class="fmc-thumb" />
            <div>
              <div class="fmc-title">${f.name}</div>
              <div class="fmc-sub">${f.subtitle}</div>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; flex-grow: 1;">
            ${f.desc}
          </p>
          <div class="fmc-sliders">
            <div class="fmc-slider-row">
              <span>Cocoa Intensity</span>
              <div class="fmc-progress">
                <div class="fmc-progress-bar" style="width: ${cocoaPct}%;"></div>
              </div>
            </div>
            <div class="fmc-slider-row">
              <span>Sweetness</span>
              <div class="fmc-progress">
                <div class="fmc-progress-bar" style="width: ${sweetPct}%; background-color: var(--color-caramel-400);"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // ==========================================
  // 12. Pincode Delivery Estimator
  // ==========================================
  const pinInput = document.getElementById("pincode-check-input");
  const pinBtn = document.getElementById("btn-check-pincode");
  const pinResult = document.getElementById("pincode-result");

  function checkPincode() {
    if (!pinInput || !pinResult) return;
    const pin = pinInput.value.trim();
    if (!/^\d{6}$/.test(pin)) {
      pinResult.style.display = "block";
      pinResult.style.color = "#c0392b";
      pinResult.innerHTML = "⚠️ Please enter a valid 6-digit postal code.";
      return;
    }

    pinResult.style.display = "block";
    pinResult.style.color = "#27ae60";
    pinResult.innerHTML = `🎉 <strong>Fresh Bake Delivery Available for ${pin}!</strong> Baked to order and dispatched in insulated kraft packaging within 24–48 hours.`;
  }

  if (pinBtn) pinBtn.addEventListener("click", checkPincode);
  if (pinInput) {
    pinInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkPincode();
      }
    });
  }

  // ==========================================
  // 13. Owner Admin System
  // ==========================================

  // Add Product & Change Image DOM elements
  const ownerAddBtn = document.getElementById("owner-add-product-btn");
  const ownerAddModalOverlay = document.getElementById("owner-add-modal-overlay");
  const ownerAddClose = document.getElementById("owner-add-close");
  const ownerAddCancel = document.getElementById("owner-add-cancel");
  const ownerAddForm = document.getElementById("owner-add-form");
  const addProdName = document.getElementById("add-prod-name");
  const addProdPrice = document.getElementById("add-prod-price");
  const addProdCategory = document.getElementById("add-prod-category");
  const addProdBadge = document.getElementById("add-prod-badge");
  const addProdDesc = document.getElementById("add-prod-desc");
  const addProdFile = document.getElementById("add-prod-file");
  const addProdPreview = document.getElementById("add-prod-preview");
  const addProdPresets = document.getElementById("add-prod-presets");

  const ownerImgModalOverlay = document.getElementById("owner-img-modal-overlay");
  const ownerImgClose = document.getElementById("owner-img-close");
  const ownerImgCancel = document.getElementById("owner-img-cancel");
  const ownerImgSave = document.getElementById("owner-img-save");
  const changeModalFile = document.getElementById("change-modal-file");
  const changeModalPreview = document.getElementById("change-modal-preview");
  const changeModalUrl = document.getElementById("change-modal-url");
  const changeModalApplyUrl = document.getElementById("change-modal-apply-url");
  const changeModalPresets = document.getElementById("change-modal-presets");
  const ownerImgProductName = document.getElementById("owner-img-product-name");

  let activeChangeImgProductId = null;
  let activeChangeImgSrc = "";
  let selectedAddProductImg = "assets/images/choco-melt-hd.jpg";

  // Canvas image compressor to ensure base64 uploads are small (<75KB) and fit in localStorage
  function processImageFile(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 750;
        const maxH = 500;
        let w = img.width;
        let h = img.height;
        if (w > maxW || h > maxH) {
          if (w / h > maxW / maxH) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          } else {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function syncInputsToData() {
    if (!productsGrid) return;
    productsGrid.querySelectorAll(".owner-price-input").forEach(input => {
      const id = input.dataset.id;
      const val = parseInt(input.value, 10);
      if (!isNaN(val) && val > 0) {
        const prod = MELTORA_DATA.products.find(p => p.id === id);
        if (prod) prod.price = val;
      }
    });
  }

  function loadMenuOverrides() {
    try {
      const saved = localStorage.getItem("meltora_menu_overrides");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.customProductsList && Array.isArray(data.customProductsList) && data.customProductsList.length > 0) {
          MELTORA_DATA.products = data.customProductsList;
        } else if (data.products) {
          MELTORA_DATA.products.forEach(p => {
            const override = data.products[p.id];
            if (override) {
              if (override.price !== undefined && !isNaN(override.price)) {
                p.price = Number(override.price);
              }
              if (override.isSoldOut !== undefined) {
                p.isSoldOut = Boolean(override.isSoldOut);
                if (p.isSoldOut) {
                  p.badge = "SOLD OUT";
                  p.badgeType = "dark";
                }
              }
              if (override.image) {
                p.image = override.image;
              }
            }
          });
        }
        if (data.bannerHtml && announcementText) {
          announcementText.innerHTML = data.bannerHtml;
        }
      }
    } catch (e) {
      console.warn("Could not load menu overrides from localStorage", e);
    }
  }

  function openOwnerModal() {
    if (!ownerModalOverlay) return;
    ownerModalOverlay.style.display = "flex";
    setTimeout(() => ownerModalOverlay.classList.add("open"), 10);
    if (ownerPinInput) {
      ownerPinInput.value = "";
      setTimeout(() => ownerPinInput.focus(), 150);
    }
    if (ownerPinError) ownerPinError.style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function closeOwnerModal() {
    if (!ownerModalOverlay) return;
    ownerModalOverlay.classList.remove("open");
    setTimeout(() => {
      ownerModalOverlay.style.display = "none";
      document.body.style.overflow = "";
    }, 250);
  }

  function enterOwnerMode() {
    isOwnerMode = true;
    closeOwnerModal();
    document.body.classList.add("owner-mode-active");
    if (ownerAdminBar) ownerAdminBar.style.display = "block";
    if (announcementText) announcementText.setAttribute("contenteditable", "true");
    if (ownerBannerTag) ownerBannerTag.style.display = "inline-flex";

    renderProducts(currentCategory);
    showToast("Welcome to Owner Admin Mode! 👑");
  }

  function exitOwnerMode() {
    isOwnerMode = false;
    document.body.classList.remove("owner-mode-active");
    if (ownerAdminBar) ownerAdminBar.style.display = "none";
    if (announcementText) announcementText.removeAttribute("contenteditable");
    if (ownerBannerTag) ownerBannerTag.style.display = "none";

    closeAddProductModal();
    closeChangeImgModal();

    renderProducts(currentCategory);
    showToast("Exited Owner Mode");
  }

  function saveOwnerChanges(isSilent = false) {
    syncInputsToData();

    const bannerHtml = announcementText ? announcementText.innerHTML : "";
    const overrides = {
      bannerHtml: bannerHtml,
      customProductsList: MELTORA_DATA.products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        badge: p.badge,
        badgeType: p.badgeType || "gold",
        price: p.price,
        unit: p.unit || (p.category === "box" ? "box" : "piece"),
        weight: p.weight || (p.category === "box" ? "Curated Box" : "75 g"),
        desc: p.desc,
        highlights: p.highlights || ["Handcrafted", "Baked to order"],
        image: p.image,
        alt: p.alt || p.name,
        cocoaIntensity: p.cocoaIntensity || 7,
        sweetness: p.sweetness || 6,
        isSoldOut: !!p.isSoldOut,
        isCustom: !!p.isCustom
      }))
    };

    try {
      localStorage.setItem("meltora_menu_overrides", JSON.stringify(overrides));
      populateOrderSelect();
      if (!isSilent) {
        showToast("Menu updated successfully! ✨");
      }
    } catch (err) {
      console.error("Failed to save menu changes", err);
      alert("Error saving changes to localStorage: storage limit might be exceeded.");
    }
  }

  function resetOwnerDefaults() {
    if (confirm("Reset all prices, stock statuses, products, and announcement banner to factory defaults?")) {
      try {
        localStorage.removeItem("meltora_menu_overrides");
      } catch (e) {}

      // Deep restore from backup
      MELTORA_DATA.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS_BACKUP));
      if (announcementText) {
        announcementText.innerHTML = DEFAULT_BANNER_HTML;
      }

      renderProducts(currentCategory);
      populateOrderSelect();
      showToast("Menu reset to default! ↺");
    }
  }

  // ==========================================
  // Add Product Modal Logic
  // ==========================================
  function openAddProductModal() {
    if (!ownerAddModalOverlay) return;
    if (addProdName) addProdName.value = "";
    if (addProdPrice) addProdPrice.value = "";
    if (addProdCategory) addProdCategory.value = currentCategory === "box" ? "box" : "single";
    if (addProdBadge) addProdBadge.value = "";
    if (addProdDesc) addProdDesc.value = "";
    if (addProdFile) addProdFile.value = "";

    selectedAddProductImg = "assets/images/choco-melt-hd.jpg";
    if (addProdPreview) addProdPreview.src = selectedAddProductImg;

    if (addProdPresets) {
      addProdPresets.querySelectorAll(".preset-thumb").forEach((t, i) => {
        t.classList.toggle("active", i === 0);
      });
    }

    ownerAddModalOverlay.style.display = "flex";
    setTimeout(() => ownerAddModalOverlay.classList.add("open"), 10);
    document.body.style.overflow = "hidden";
    if (addProdName) setTimeout(() => addProdName.focus(), 150);
  }

  function closeAddProductModal() {
    if (!ownerAddModalOverlay) return;
    ownerAddModalOverlay.classList.remove("open");
    setTimeout(() => {
      ownerAddModalOverlay.style.display = "none";
      if (!ownerModalOverlay?.classList.contains("open") && !ownerImgModalOverlay?.classList.contains("open")) {
        document.body.style.overflow = "";
      }
    }, 250);
  }

  // Handle Preset Clicks in Add Modal
  if (addProdPresets) {
    addProdPresets.querySelectorAll(".preset-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        addProdPresets.querySelectorAll(".preset-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        selectedAddProductImg = thumb.dataset.src;
        if (addProdPreview) addProdPreview.src = selectedAddProductImg;
      });
    });
  }

  // Handle File Upload in Add Modal
  if (addProdFile) {
    addProdFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        processImageFile(file, (dataUrl) => {
          selectedAddProductImg = dataUrl;
          if (addProdPreview) addProdPreview.src = dataUrl;
          if (addProdPresets) {
            addProdPresets.querySelectorAll(".preset-thumb").forEach(t => t.classList.remove("active"));
          }
        });
      }
    });
  }

  // Submit Add Product Form
  if (ownerAddForm) {
    ownerAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = addProdName?.value.trim();
      const price = parseInt(addProdPrice?.value, 10);
      const category = addProdCategory?.value || "single";
      const badge = addProdBadge?.value.trim() || "";
      const desc = addProdDesc?.value.trim() || `${name} — handcrafted artisanal chocolate brownie, baked to order and made to melt.`;

      if (!name || isNaN(price) || price <= 0) {
        alert("Please provide a valid product name and price.");
        return;
      }

      const cleanId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-4);

      const newProduct = {
        id: cleanId,
        name: name,
        category: category,
        badge: badge,
        badgeType: badge ? "gold" : "",
        price: price,
        unit: category === "box" ? "box" : "piece",
        weight: category === "box" ? "Curated Gift Box" : "75 g",
        desc: desc,
        highlights: ["Handcrafted in small batches", "Freshly baked to order", "Made to Melt"],
        image: selectedAddProductImg || "assets/images/choco-melt-hd.jpg",
        alt: name,
        cocoaIntensity: 8,
        sweetness: 6,
        isSoldOut: false,
        isCustom: true
      };

      MELTORA_DATA.products.push(newProduct);
      closeAddProductModal();
      renderProducts(currentCategory);
      populateOrderSelect();
      saveOwnerChanges(true);
      showToast(`Added "${name}" to menu! 🍫✨`);
    });
  }

  if (ownerAddBtn) ownerAddBtn.addEventListener("click", openAddProductModal);
  if (ownerAddClose) ownerAddClose.addEventListener("click", closeAddProductModal);
  if (ownerAddCancel) ownerAddCancel.addEventListener("click", closeAddProductModal);
  if (ownerAddModalOverlay) {
    ownerAddModalOverlay.addEventListener("click", (e) => {
      if (e.target === ownerAddModalOverlay) closeAddProductModal();
    });
  }

  // ==========================================
  // Change Image Modal Logic
  // ==========================================
  function openChangeImgModal(productId) {
    const prod = MELTORA_DATA.products.find(p => p.id === productId);
    if (!prod || !ownerImgModalOverlay) return;

    activeChangeImgProductId = productId;
    activeChangeImgSrc = prod.image;

    if (ownerImgProductName) ownerImgProductName.textContent = prod.name;
    if (changeModalPreview) changeModalPreview.src = prod.image;
    if (changeModalUrl) changeModalUrl.value = prod.image.startsWith("data:") ? "" : prod.image;
    if (changeModalFile) changeModalFile.value = "";

    if (changeModalPresets) {
      changeModalPresets.querySelectorAll(".preset-thumb").forEach(t => {
        t.classList.toggle("active", t.dataset.src === prod.image);
      });
    }

    ownerImgModalOverlay.style.display = "flex";
    setTimeout(() => ownerImgModalOverlay.classList.add("open"), 10);
    document.body.style.overflow = "hidden";
  }

  function closeChangeImgModal() {
    if (!ownerImgModalOverlay) return;
    ownerImgModalOverlay.classList.remove("open");
    setTimeout(() => {
      ownerImgModalOverlay.style.display = "none";
      if (!ownerModalOverlay?.classList.contains("open") && !ownerAddModalOverlay?.classList.contains("open")) {
        document.body.style.overflow = "";
      }
    }, 250);
  }

  // Presets in Change Modal
  if (changeModalPresets) {
    changeModalPresets.querySelectorAll(".preset-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        changeModalPresets.querySelectorAll(".preset-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        activeChangeImgSrc = thumb.dataset.src;
        if (changeModalPreview) changeModalPreview.src = activeChangeImgSrc;
        if (changeModalUrl) changeModalUrl.value = activeChangeImgSrc;
      });
    });
  }

  // Upload Photo in Change Modal
  if (changeModalFile) {
    changeModalFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        processImageFile(file, (dataUrl) => {
          activeChangeImgSrc = dataUrl;
          if (changeModalPreview) changeModalPreview.src = dataUrl;
          if (changeModalPresets) {
            changeModalPresets.querySelectorAll(".preset-thumb").forEach(t => t.classList.remove("active"));
          }
        });
      }
    });
  }

  // Apply URL in Change Modal
  if (changeModalApplyUrl && changeModalUrl) {
    changeModalApplyUrl.addEventListener("click", () => {
      const url = changeModalUrl.value.trim();
      if (url) {
        activeChangeImgSrc = url;
        if (changeModalPreview) changeModalPreview.src = url;
        if (changeModalPresets) {
          changeModalPresets.querySelectorAll(".preset-thumb").forEach(t => t.classList.remove("active"));
        }
      }
    });
  }

  // Save Image Update
  if (ownerImgSave) {
    ownerImgSave.addEventListener("click", () => {
      if (activeChangeImgProductId && activeChangeImgSrc) {
        const prod = MELTORA_DATA.products.find(p => p.id === activeChangeImgProductId);
        if (prod) {
          prod.image = activeChangeImgSrc;
          closeChangeImgModal();
          renderProducts(currentCategory);
          saveOwnerChanges(true);
          showToast(`Photo updated for "${prod.name}"! 📸✨`);
        }
      }
    });
  }

  if (ownerImgClose) ownerImgClose.addEventListener("click", closeChangeImgModal);
  if (ownerImgCancel) ownerImgCancel.addEventListener("click", closeChangeImgModal);
  if (ownerImgModalOverlay) {
    ownerImgModalOverlay.addEventListener("click", (e) => {
      if (e.target === ownerImgModalOverlay) closeChangeImgModal();
    });
  }

  // ==========================================
  // Delete Product Logic
  // ==========================================
  function deleteProduct(productId) {
    const prod = MELTORA_DATA.products.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Are you sure you want to delete "${prod.name}" from the menu?`)) {
      MELTORA_DATA.products = MELTORA_DATA.products.filter(p => p.id !== productId);
      renderProducts(currentCategory);
      populateOrderSelect();
      saveOwnerChanges(true);
      showToast(`"${prod.name}" removed from menu.`);
    }
  }

  // Owner Portal & PIN Modal Listeners
  if (ownerPortalTrigger) ownerPortalTrigger.addEventListener("click", openOwnerModal);
  if (ownerPinClose) ownerPinClose.addEventListener("click", closeOwnerModal);
  if (ownerModalOverlay) {
    ownerModalOverlay.addEventListener("click", (e) => {
      if (e.target === ownerModalOverlay) closeOwnerModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (ownerAddModalOverlay?.classList.contains("open")) closeAddProductModal();
      else if (ownerImgModalOverlay?.classList.contains("open")) closeChangeImgModal();
      else if (ownerModalOverlay?.classList.contains("open")) closeOwnerModal();
    }
  });

  if (ownerPinForm) {
    ownerPinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pin = ownerPinInput ? ownerPinInput.value.trim() : "";
      if (pin === OWNER_PIN) {
        enterOwnerMode();
      } else {
        if (ownerPinError) ownerPinError.style.display = "block";
        if (ownerPinInput) {
          ownerPinInput.classList.add("pin-shake");
          setTimeout(() => ownerPinInput.classList.remove("pin-shake"), 500);
          ownerPinInput.value = "";
          ownerPinInput.focus();
        }
      }
    });
  }

  if (ownerSaveBtn) ownerSaveBtn.addEventListener("click", () => saveOwnerChanges(false));
  if (ownerResetBtn) ownerResetBtn.addEventListener("click", resetOwnerDefaults);
  if (ownerExitBtn) ownerExitBtn.addEventListener("click", exitOwnerMode);

  // ==========================================
  // 14. Run Initial Renders
  // ==========================================
  loadMenuOverrides();
  renderProducts();
  renderWhyUs();
  renderCraft();
  renderInstagram();
  renderReviews();
  renderFAQs();
  renderFlavourGuide();
  populateOrderSelect();
  updateCartUI();
});