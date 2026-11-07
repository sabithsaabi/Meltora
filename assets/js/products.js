// Meltora Products & Brand Data — Updated from Official Menu & Artwork
const MELTORA_DATA = {
  brand: {
    name: "Meltora",
    tagline: "Made to Melt.",
    subtagline: "PREMIUM CHOCOLATE BROWNIES",
    catchphrase: "Rich Fudgy Irresistible ♡",
    description: "Premium handmade chocolate brownies. 75 g each, baked to order, made to melt.",
    phone: "+91 75590 22150",
    phoneClean: "917559022150",
    instagram: "@meltora.in_",
    instagramUrl: "https://instagram.com/meltora.in_",
    rating: "4.9",
    ratingCount: "250+ reviews",
    weightPerPiece: "75 g",
    logoImage: "assets/images/user-logo.jpg",
    heroImage: "assets/images/choco-melt-hd.jpg",
    menuPoster: "assets/images/meltora-menu-poster.png",
    flavoursPoster: "assets/images/meltora-menu-flavours.jpg"
  },

  flavours: [
    {
      id: "choco-melt",
      name: "Choco Melt",
      subtitle: "Classic Molten Centre",
      desc: "Classic chocolate-filled brownie.",
      cocoa: 7,
      sweetness: 6
    },
    {
      id: "double-choco-melt",
      name: "Double Choco Melt",
      subtitle: "Double Chocolate Filling",
      desc: "Double chocolate filling for the ultimate chocolate experience.",
      cocoa: 9,
      sweetness: 4
    },
    {
      id: "peanut-melt",
      name: "Peanut Melt",
      subtitle: "Creamy Peanut Butter",
      desc: "Chocolate brownie with creamy peanut butter filling.",
      cocoa: 7,
      sweetness: 6
    },
    {
      id: "nutella-melt",
      name: "Nutella Melt",
      subtitle: "Rich Hazelnut Spread",
      desc: "Nutella-filled brownie with rich hazelnut spread.",
      cocoa: 6,
      sweetness: 8
    },
    {
      id: "signature-meltora",
      name: "Signature Meltora",
      subtitle: "Signature Chocolate-Hazelnut",
      desc: "Signature chocolate-hazelnut filling handcrafted to perfection.",
      cocoa: 8,
      sweetness: 7
    },
    {
      id: "hazelnut-melt",
      name: "Hazelnut Melt",
      subtitle: "Creamy Hazelnut Filling",
      desc: "Chocolate brownie with silky creamy hazelnut filling.",
      cocoa: 7,
      sweetness: 7
    }
  ],

  products: [
    {
      id: "choco-melt",
      name: "Choco Melt",
      category: "single",
      badge: "BESTSELLER",
      badgeType: "gold",
      price: 99,
      unit: "piece",
      weight: "75 g",
      desc: "Classic chocolate-filled brownie with a flowing molten chocolate centre and glossy crackled top.",
      highlights: ["75 g pure fudge", "Classic chocolate filling", "Molten crackle crust"],
      image: "assets/images/choco-melt-hd.jpg",
      alt: "Choco Melt - Classic chocolate-filled brownie",
      cocoaIntensity: 7,
      sweetness: 6,
      ingredients: "Callebaut 54% dark chocolate, pure dairy butter, brown sugar, eggs, organic flour, Dutch cocoa.",
      allergens: "Contains dairy, gluten, eggs.",
      tastingNotes: "Rich, comforting cocoa notes with a glossy paper-crust snap and an oozing warm chocolate center.",
      reheatTip: "Microwave for 15 seconds for that signature molten pull."
    },
    {
      id: "double-choco-melt",
      name: "Double Choco Melt",
      category: "single",
      badge: "INTENSE COCOA",
      badgeType: "dark",
      price: 109,
      unit: "piece",
      weight: "75 g",
      desc: "Double chocolate filling for the ultimate chocolate experience — for those who crave it richer and darker.",
      highlights: ["Double chocolate core", "Dense fudgy chew", "70% dark ganache"],
      image: "assets/images/double-choco-melt-hd.jpg",
      alt: "Double Choco Melt - Double chocolate filling brownie",
      cocoaIntensity: 9,
      sweetness: 4,
      ingredients: "70% dark couverture chocolate, unsalted pure butter, cane sugar, eggs, Dutch cocoa.",
      allergens: "Contains dairy, gluten, eggs.",
      tastingNotes: "Intensely chocolatey and less sweet, with deep roasted cocoa aromas and molten dark core.",
      reheatTip: "Warm for 18–20 seconds to release the full depth of dark chocolate ganache."
    },
    {
      id: "peanut-melt",
      name: "Peanut Melt",
      category: "single",
      badge: "CHEF'S PICK",
      badgeType: "warm",
      price: 119,
      unit: "piece",
      weight: "75 g",
      desc: "Chocolate brownie with creamy peanut butter filling, baked so the centre stays soft and spoonable.",
      highlights: ["Creamy peanut butter", "Crushed peanut topping", "Savoury-sweet balance"],
      image: "assets/images/peanut-melt-hd.jpg",
      alt: "Peanut Melt - Chocolate brownie with creamy peanut butter filling",
      cocoaIntensity: 7,
      sweetness: 6,
      ingredients: "Dark cocoa fudge, roasted peanut butter swirl, sea salt touch, pure butter.",
      allergens: "Contains peanuts, dairy, gluten, eggs.",
      tastingNotes: "Perfect sweet-and-salty harmony between thick dark chocolate and velvety slow-roasted peanut butter.",
      reheatTip: "Microwave for 15 seconds until the peanut butter center is luxuriously spoonable."
    },
    {
      id: "nutella-melt",
      name: "Nutella Melt",
      category: "single",
      badge: "FAN FAVOURITE",
      badgeType: "gold",
      price: 129,
      unit: "piece",
      weight: "75 g",
      desc: "Nutella-filled brownie with rich hazelnut spread — topped with toasted hazelnuts and chocolate drizzle.",
      highlights: ["Nutella hazelnut filling", "Toasted hazelnut crunch", "Signature ribbon pull"],
      image: "assets/images/nutella-melt-hd.jpg",
      alt: "Nutella Melt - Nutella-filled brownie with rich hazelnut spread",
      cocoaIntensity: 6,
      sweetness: 8,
      ingredients: "Dark chocolate brownie base, authentic Italian hazelnut spread, roasted whole hazelnuts, pure butter.",
      allergens: "Contains tree nuts (hazelnuts), dairy, gluten, eggs.",
      tastingNotes: "Velvety smooth, aromatic hazelnut chocolate goodness that pulls into a luscious ribbon when cut.",
      reheatTip: "Heat 12–15 seconds and pair with cold milk or vanilla ice cream."
    },
    {
      id: "signature-meltora",
      name: "Signature Meltora",
      category: "single",
      badge: "SPECIAL DROP",
      badgeType: "gold",
      price: 139,
      unit: "piece",
      weight: "75 g",
      desc: "Signature chocolate-hazelnut filling — our bakery's crown jewel recipe.",
      highlights: ["Signature recipe", "Chocolate-hazelnut filling", "Artisan topping"],
      image: "assets/images/signature-meltora-hd.jpg",
      alt: "Signature Meltora - Signature chocolate-hazelnut filling brownie",
      cocoaIntensity: 8,
      sweetness: 7,
      ingredients: "Proprietary blend of Belgian dark cocoa and slow-roasted hazelnut praline, pure butter, farm eggs.",
      allergens: "Contains tree nuts (hazelnuts), dairy, gluten, eggs.",
      tastingNotes: "The quintessential Meltora experience — silky roasted nut praline enveloped in dark molten fudge.",
      reheatTip: "Warm for 15 seconds for a Michelin-bakery dessert experience."
    },
    {
      id: "hazelnut-melt",
      name: "Hazelnut Melt",
      category: "single",
      badge: "NUTTY CRUNCH",
      badgeType: "warm",
      price: 129,
      unit: "piece",
      weight: "75 g",
      desc: "Creamy hazelnut filling wrapped in fudgy chocolate brownie with roasted nut garnish.",
      highlights: ["Creamy hazelnut filling", "Whole hazelnut garnish", "75 g pure fudge"],
      image: "assets/images/hazelnut-melt-hd.jpg",
      alt: "Hazelnut Melt - Creamy hazelnut filling brownie",
      cocoaIntensity: 7,
      sweetness: 7,
      ingredients: "Dark cocoa brownie, slow-churned hazelnut cream, crushed roasted hazelnuts.",
      allergens: "Contains tree nuts (hazelnuts), dairy, gluten, eggs.",
      tastingNotes: "A lighter, intensely nutty variation with delicate roasted hazelnut aroma.",
      reheatTip: "Warm 15 seconds to soften the hazelnut cream core."
    },
    {
      id: "pistachio-dream",
      name: "Pistachio Dream",
      category: "single",
      badge: "SEASONAL • SOLD OUT",
      badgeType: "dark",
      price: 149,
      unit: "piece",
      weight: "75 g",
      isSoldOut: true,
      desc: "Pistachio cream filling with crushed emerald pistachios on top. (Temporarily sold out — next drop soon!)",
      highlights: ["Pistachio cream filling", "Crushed emerald pistachios", "Limited edition drop"],
      image: "assets/images/pistachio-dream.jpg",
      alt: "Pistachio Dream - Pistachio cream filling brownie",
      cocoaIntensity: 7,
      sweetness: 6,
      ingredients: "Bronte pistachio paste, dark cocoa brownie, roasted Iranian pistachio nibs.",
      allergens: "Contains tree nuts (pistachios), dairy, gluten.",
      tastingNotes: "Earthy, fragrant pistachio cream contrasted against decadent dark cocoa fudge.",
      reheatTip: "Serve at gentle room temperature."
    },
    {
      id: "box-4",
      name: "Brownie Box — 4 Pieces",
      category: "box",
      badge: "FROM ₹379",
      badgeType: "warm",
      price: 379,
      unit: "box",
      boxSize: 4,
      desc: "Any four 75 g brownies of your choice, packed in our signature kraft gift box.",
      highlights: ["Choose any 4 flavours", "Signature kraft box & twine", "Free handwritten message card"],
      image: "assets/images/kraft-box-hd.jpg",
      alt: "Meltora Brownie Box - 4 piece kraft gift box with seal",
      tastingNotes: "Net weight 300 g. Freshly baked for your pre-order date.",
      reheatTip: "Warm pieces individually for 15 seconds."
    },
    {
      id: "box-6",
      name: "Brownie Box — 6 Pieces",
      category: "box",
      badge: "FROM ₹559",
      badgeType: "gold",
      price: 559,
      unit: "box",
      boxSize: 6,
      desc: "Six 75 g brownies of your choice, packed in our signature round kraft gift box with Meltora seal.",
      highlights: ["Choose any 6 flavours", "Round kraft artisanal box", "Satin ribbon & gift tag"],
      image: "assets/images/kraft-box-hd.jpg",
      alt: "Meltora Brownie Box - 6 piece round kraft gift box",
      tastingNotes: "Net weight 450 g. Most popular option for weekend treats and gifting.",
      reheatTip: "Serve warm at gatherings or chill for a dense truffle texture."
    },
    {
      id: "box-9",
      name: "Brownie Box — 9 Pieces",
      category: "box",
      badge: "FROM ₹819",
      badgeType: "gold",
      price: 819,
      unit: "box",
      boxSize: 9,
      desc: "Nine brownies, mixed any way you like from the signature fillings — our favourite box for celebrations and gifting.",
      highlights: ["Choose any 9 flavours", "Deluxe celebration box", "Custom ribbon & seal"],
      image: "assets/images/kraft-box-hd.jpg",
      alt: "Meltora Brownie Box - 9 piece celebration gift box",
      tastingNotes: "Net weight 675 g. The ultimate luxury indulgence for birthdays, parties, and festive hampers.",
      reheatTip: "Individual pieces can be warmed on demand."
    }
  ],

  whyUs: [
    {
      icon: "sparkles",
      title: "Premium Ingredients",
      desc: "Real chocolate, real butter, roasted hazelnuts and creamy peanut butter — no shortcuts and nothing artificial."
    },
    {
      icon: "clock",
      title: "Freshly Prepared to Order",
      desc: "Every box is baked for your pre-order date, so it reaches you soft, fudgy and fresh — never sitting on a shelf."
    },
    {
      icon: "gift",
      title: "Perfect for Gifting & Special Moments",
      desc: "Kraft gift boxes and handwritten notes make every box ready to give for birthdays and special moments."
    },
    {
      icon: "scale",
      title: "75 g of Pure Fudge",
      desc: "Each brownie weighs a generous 75 g, with a crackled top and a molten filling at the centre."
    },
    {
      icon: "heart",
      title: "Four Signature Fillings",
      desc: "Choco Melt, Double Choco Melt, Peanut Melt, Nutella Melt & Signature Meltora — mix your box your way."
    }
  ],

  craftStories: [
    {
      title: "Real Chocolate, Nothing Less",
      desc: "We build every recipe around real chocolate, so the flavour stays deep and rounded rather than simply sweet.",
      points: ["Premium ingredients", "No artificial flavours", "Rich, deep cocoa"],
      image: "assets/images/choco-melt-hd.jpg",
      alt: "Chocolate pour and crackled brownie crust"
    },
    {
      title: "Fillings That Actually Melt",
      desc: "Nutella Melt and Peanut Melt are filled by hand, so every piece pulls a clean ribbon of spread instead of a thin smear.",
      points: ["Roasted hazelnuts", "Creamy peanut butter", "Generously filled centres"],
      image: "assets/images/peanut-melt-hd.jpg",
      alt: "Molten filling pulling cleanly apart"
    },
    {
      title: "Handmade, Batch by Batch",
      desc: "Small batches let us control every detail — from the fudgy centre to the glossy, crackled top.",
      points: ["Mixed and baked by hand", "Checked piece by piece", "Packed fresh for your date"],
      image: "assets/images/kraft-box-hd.jpg",
      alt: "Artisanal round kraft gift box packed fresh"
    }
  ],

  instagramFeed: [
    {
      caption: "Fresh from the oven — crackled tops, fudgy middles.",
      tag: "#BakedFresh",
      image: "assets/images/choco-melt-hd.jpg"
    },
    {
      caption: "Cocoa, chocolate and butter. Nothing else.",
      tag: "#RealIngredients",
      image: "assets/images/double-choco-melt-hd.jpg"
    },
    {
      caption: "That molten pour. Slow, glossy, potent.",
      tag: "#MoltenCentre",
      image: "assets/images/nutella-melt-hd.jpg"
    },
    {
      caption: "Kraft boxes, tied and ready for someone you love.",
      tag: "#GiftReady",
      image: "assets/images/kraft-box-hd.jpg"
    },
    {
      caption: "Peanut Melt, pulled apart to show the filling.",
      tag: "#PeanutMelt",
      image: "assets/images/peanut-melt-hd.jpg"
    },
    {
      caption: "Listen for the snap. Real chocolate always tells you.",
      tag: "#SignatureMelt",
      image: "assets/images/signature-meltora-hd.jpg"
    }
  ],

  reviews: [
    {
      name: "Sarah M.",
      tag: "Verified buyer",
      rating: 5,
      text: "The fudgiest brownies I've ever had — they truly melt in your mouth. I ordered a second box the same week."
    },
    {
      name: "Daniel R.",
      tag: "Gift buyer",
      rating: 5,
      text: "Ordered the 9-piece box for my mother's birthday and she called me three times to talk about how good it was."
    },
    {
      name: "Priya K.",
      tag: "Verified buyer",
      rating: 5,
      text: "You can taste the real chocolate and butter. Nothing like supermarket brownies — the Nutella Melt is unreal."
    },
    {
      name: "Laura B.",
      tag: "Repeat customer",
      rating: 5,
      text: "Messaged my order on Instagram, collected it fresh, and the kraft box looked beautiful. Already planning the next one."
    }
  ],

  faqs: [
    {
      question: "How do I place an order?",
      answer: "Choose your brownies or curated box above and either tap 'Add to Cart' or fill out our Pre-Order form below. Clicking 'Send My Order on WhatsApp' instantly prepares your formatted order details and sends them directly to our bakery WhatsApp (7559022150) for immediate confirmation."
    },
    {
      question: "How far in advance should I order?",
      answer: "We recommend placing your pre-order at least 24 to 48 hours in advance. Since every brownie is baked to order and packed fresh from our kitchen, early booking ensures your preferred date slot is reserved."
    },
    {
      question: "How big are the brownies?",
      answer: "Each Meltora brownie is an indulgent, dense square weighing exactly 75 grams. They are generously thick with a delicate shiny paper-thin crackle crust and an oozing molten core."
    },
    {
      question: "How should I store my brownies?",
      answer: "Store them in an airtight container at cool room temperature for up to 4 days, or in the refrigerator for up to 10 days. For that signature bakery-fresh molten experience, microwave for 15–20 seconds right before serving!"
    },
    {
      question: "Which flavours can I choose from?",
      answer: "Our menu features Choco Melt (₹99), Double Choco Melt (₹109), Peanut Melt (₹119), Nutella Melt (₹129), Signature Meltora (₹139), and Hazelnut Melt (₹129). When you order a 4, 6, or 9 piece box, you can mix and match any combination you love!"
    },
    {
      question: "Are they good for gifting or big occasions?",
      answer: "Absolutely! Every box is carefully packaged in our eco-friendly kraft gift box, wrapped with rustic twine and includes a complimentary handwritten personalized gift card upon request. Perfect for birthdays, anniversaries, hampers, and corporate gifts."
    }
  ]
};

// Export for module/global browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MELTORA_DATA;
}
