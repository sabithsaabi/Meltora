# Meltora — Made to Melt. 🍫
### Premium Chocolate Brownies, Baked to Order (E-Commerce Web Platform)

> A modern, responsive e-commerce web application crafted specifically for **Meltora** artisanal homemade chocolate brownies. Faithfully updated with the **official brand logo**, **official product photos**, **exact menu pricing**, and **direct WhatsApp pre-ordering**.

---

## 🌟 Official Brand Assets & Features

### 1. Official Logo & Visual Identity
- **Logo**: Features the signature liquid chocolate dripping **"M"** adorned with whole hazelnuts and a dark chocolate block, with the brandmark *"MELTORA — Made to Melt. — PREMIUM CHOCOLATE BROWNIES"*.
- **Official Artwork**: Integrated directly from brand assets (`assets/images/meltora-logo.jpg`).
- **Signature Hero Plate**: Highlighting the crackle-crust brownie drizzled with rich molten cocoa (`assets/images/hero-plate.jpg`).
- **Official Menu Poster Lightbox**: Customers can click *"View Full Menu Poster"* to inspect the official bakery menu board in full resolution (`assets/images/meltora-menu-poster.jpg`).

---

## 🍫 Official Menu & Available Products

| Product | Details | Price | Status |
| :--- | :--- | :--- | :--- |
| **Choco Melt** | Classic chocolate-filled brownie with molten core & crackled top | **₹99** / pc | Available (Bestseller) |
| **Double Choco Melt** | Double chocolate filling for the ultimate dark chocolate experience | **₹109** / pc | Available |
| **Peanut Melt** | Chocolate brownie with creamy peanut butter filling & peanut crunch | **₹119** / pc | Available (Chef's Pick) |
| **Nutella Melt** | Nutella-filled brownie with rich Italian hazelnut spread | **₹129** / pc | Available (Fan Favourite) |
| **Signature Meltora** | Signature chocolate-hazelnut filling — bakery crown jewel | **₹139** / pc | Available (Special Drop) |
| **Hazelnut Melt** | Creamy hazelnut filling with roasted whole hazelnut garnish | **₹129** / pc | Available |
| **Pistachio Dream** | Pistachio cream filling with crushed emerald pistachios | **₹149** / pc | Seasonal (Sold Out) |

### 🎁 Brownie Gift Boxes (Bespoke Kraft Box with Meltora Seal)
- **4 Pieces**: From **₹379** *(Includes 4 custom flavours, kraft gift box, handwritten note)*
- **6 Pieces**: From **₹559** *(Signature round kraft artisanal box with satin ribbon)*
- **9 Pieces**: From **₹819** *(Deluxe celebration box for birthdays, hampers, and festivals)*

---

## ⚡ Interactive Ordering & WhatsApp Integration

- **"Build Your Box" Customizer**: Interactive modal allowing customers to mix & match any flavor combination for 4, 6, and 9 piece boxes with live counters and price totals.
- **Slide-out Cart Drawer**: Real-time quantity controls, persistent `localStorage` bag, and 1-tap WhatsApp checkout.
- **Direct WhatsApp Pre-Order**:
  - Name, Phone, Email, Delivery Place/City, Pincode, Product Dropdown, Date/Notes.
  - Generates a pre-filled, itemized message directly to bakery phone: **`7559022150`** (`+91 75590 22150`).

---

## 🚀 How to Run Locally

### Option A: Zero-Dependency Node Server (Recommended)
```bash
node server.js
```
Then open your web browser at:
```
http://localhost:3000
```

### Option B: Direct File Open
Double-click `index.html` or drag it into Chrome, Edge, or Safari — all images, cart, modal dialogs, and WhatsApp links work immediately.

---

## 📁 File Structure

```
meltora/
├── index.html                   # Main webpage with semantic layout and official branding
├── server.js                    # Lightweight zero-dependency Node.js HTTP server
├── package.json                 # Project manifest with npm start / dev scripts
├── README.md                    # Documentation & product reference
└── assets/
    ├── css/
    │   └── style.css            # Luxury chocolate styling, animations, modals, drawers
    ├── js/
    │   ├── products.js          # Menu data with official prices, tasting notes, and image paths
    │   └── app.js               # Cart, box customizer, menu poster lightbox, WhatsApp engine
    └── images/
        ├── meltora-logo.jpg            # Official Meltora Logo
        ├── meltora-menu-poster.jpg     # Official Menu Board Poster
        ├── meltora-menu-flavours.jpg   # Flavour Menu Poster
        ├── hero-plate.jpg              # Signature Brownie Plate
        ├── choco-melt.jpg              # Choco Melt Photo
        ├── double-choco-melt.jpg       # Double Choco Melt Photo
        ├── peanut-melt.jpg             # Peanut Melt Photo
        ├── nutella-melt.jpg            # Nutella Melt Photo
        ├── signature-meltora.jpg       # Signature Meltora Photo
        ├── hazelnut-melt.jpg           # Hazelnut Melt Photo
        ├── pistachio-dream.jpg         # Pistachio Dream Photo
        └── kraft-box-round.jpg         # Round Kraft Gift Box Photo
```

---
© 2026 **Meltora** — Made to Melt. All rights reserved.
