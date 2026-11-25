import bulletWellness from "@/assets/products/bullet-wellness.jpg";
import couplesDevice from "@/assets/products/couples-device.jpg";
import couplesKit from "@/assets/products/couples-kit.jpg";
import lingerieSet from "@/assets/products/lingerie-set.jpg";
import lubricant from "@/assets/products/lubricant.jpg";
import massageOil from "@/assets/products/massage-oil.jpg";
import mensDevice from "@/assets/products/mens-device.jpg";
import restraintCuffs from "@/assets/products/restraint-cuffs.jpg";
import wandMassager from "@/assets/products/wand-massager.jpg";
import wellnessGiftset from "@/assets/products/wellness-giftset.jpg";

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const media = {
  heroSilk: px(15067776, 1600, 1100),
  heroSparks: px(167080, 1200, 800),
  fireworkSky: px(29440437, 1400, 900),
  blackSatin: px(6843237, 1600, 1000),
  redSilk: px(6276021, 1400, 1700),
  blackVelvet: px(21926656, 1200, 1500),
  darkRoses: px(30895097, 1000, 1300),
  roseMacro: px(1820567, 1000, 1250),
  robeBed: px(6960085, 1100, 1400),
  apothecary: px(6628491, 1100, 1400),
  candleSet: px(8789623, 1200, 900),
  blackTextile: px(4814074, 1400, 900),
};

export type Category =
  | "Vibrators & Massagers"
  | "Couples & Intimacy"
  | "Lingerie & Apparel"
  | "Men's Collection"
  | "Lubricants & Essentials"
  | "BDSM & Accessories"
  | "Wellness & Lifestyle";

export type Product = {
  id: string;
  name: string;
  house: string;
  category: Category;
  price: number;
  compareAt?: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  details: string[];
  options: { label: string; values: string[] };
  body: string;
};

export const products: Product[] = [
  {
    id: "ac-01",
    name: "Nocturne Pro Wand Massager",
    house: "Maison Nox",
    category: "Vibrators & Massagers",
    price: 129,
    compareAt: 159,
    image: wandMassager,
    badge: "Bestseller",
    rating: 4.8,
    reviews: 312,
    tagline: "Whisper-quiet recharging wand, ten sculpted rhythms.",
    description:
      "A full-size massager with a weighted silicone head and a motor tuned for low-frequency warmth rather than surface buzz. Magnetic charging base, travel lock, and a shell that wipes clean in seconds.",
    details: [
      "Medical-grade silicone head, seamless seam",
      "10 patterns · 4 intensities · memory function",
      "Rechargeable — 140 minutes of runtime",
      "Submersible, IPX7 rated",
    ],
    options: { label: "Finish", values: ["Blush", "Onyx", "Claret"] },
    body: "Discreet matte box, unmarked outer packaging.",
  },
  {
    id: "ac-02",
    name: "Tempo Duo Couples Vibrator",
    house: "Aurelle",
    category: "Couples & Intimacy",
    price: 189,
    image: couplesDevice,
    badge: "New Arrival",
    isNew: true,
    rating: 4.9,
    reviews: 148,
    tagline: "Wearable, app-guided, made for two.",
    description:
      "A slim wearable designed to be shared — remote rhythm control, a flexible hinge that adapts to the moment, and a quiet profile that stays private. Pairs to the companion app for guided sessions.",
    details: [
      "Rose-gold alloy trim over soft-touch silicone",
      "App + partner-control modes",
      "Flexible hinge, hands-free fit",
      "Magnetic charging cradle included",
    ],
    options: { label: "Finish", values: ["Rose Gold", "Graphite"] },
    body: "Ships in a signature black gift case.",
  },
  {
    id: "ac-03",
    name: "Petal Mini Wellness Massager",
    house: "Orchid Atelier",
    category: "Vibrators & Massagers",
    price: 59,
    image: bulletWellness,
    rating: 4.7,
    reviews: 526,
    tagline: "Pocket-sized, palm-quiet, endlessly practical.",
    description:
      "The quiet little essential. A single-button interface, a sage-tinted silicone body and a grip that fits naturally — ideal for first purchases or for the travel pouch.",
    details: [
      "Five rhythm levels",
      "One-button control, travel-safe lock",
      "USB-C charging in 70 minutes",
      "Waterproof and wipe-clean",
    ],
    options: { label: "Colour", values: ["Sage", "Mauve", "Ink"] },
    body: "Presented in a plain kraft-grey carton.",
  },
  {
    id: "ac-04",
    name: "Gran Ridge Men's Massager",
    house: "Onyx & Oak",
    category: "Men's Collection",
    price: 99,
    compareAt: 119,
    image: mensDevice,
    rating: 4.6,
    reviews: 204,
    tagline: "Ergonomic grip, textured sleeve, seven strobes.",
    description:
      "Built for men who care about build quality: a matte shell with a machined accent ring, a removable textured sleeve, and a control band that can be operated one-handed without looking.",
    details: [
      "Removable, washable stretch sleeve",
      "7 speeds · 3 pulse modes",
      "Rechargeable, 90-minute runtime",
      "Body-safe materials throughout",
    ],
    options: { label: "Sleeve", values: ["Standard", "Deep Texture"] },
    body: "Unbranded delivery carton, no external markings.",
  },
  {
    id: "ac-05",
    name: "Éclat Lace Bra & Brief Set",
    house: "Rouge Élysée",
    category: "Lingerie & Apparel",
    price: 118,
    image: lingerieSet,
    badge: "Atelier Pick",
    rating: 4.9,
    reviews: 96,
    tagline: "Claret Leavers lace, gold hardware, made to be kept.",
    description:
      "A two-piece cut in French Leavers lace with a lightly lined underwire cup, adjustable straps and gilt hardware. Designed to sit as comfortably at dinner as it does at the end of it.",
    details: [
      "Leavers lace with satin lining",
      "Padded hook-and-eye back closure",
      "Matching scalloped brief included",
      "Hand wash cold, dry flat",
    ],
    options: { label: "Size", values: ["XS", "S", "M", "L", "XL"] },
    body: "Wrapped in tissue with a ribbon-tied box.",
  },
  {
    id: "ac-06",
    name: "Vespers Couples Intimacy Kit",
    house: "Casa Serena",
    category: "Couples & Intimacy",
    price: 149,
    image: couplesKit,
    badge: "Gift Edit",
    rating: 4.8,
    reviews: 74,
    tagline: "Blindfold, oil, applicator — one considered box.",
    description:
      "An evening, curated. A velvet-sleep blindfold, a warm massage oil, a rose-toned accessory and a pouch for everything else, arranged in a velvet-lined keepsake case worth keeping long after.",
    details: [
      "Satin-lined blindfold with adjustable band",
      "60ml warming massage oil",
      "Soft silicone accessory, body-safe",
      "Reusable velvet keepsake box",
    ],
    options: { label: "Box", values: ["Charcoal", "Burgundy"] },
    body: "Gift-ready outer sleeve, discreetly printed.",
  },
  {
    id: "ac-07",
    name: "Clarity Water-Based Lubricant",
    house: "Sida Labs",
    category: "Lubricants & Essentials",
    price: 28,
    image: lubricant,
    rating: 4.7,
    reviews: 1180,
    tagline: "150ml, glycerin-free, silk-dry finish.",
    description:
      "A daily-driver formula in a frosted bottle with a gold pump. pH-balanced, compatible with all toy materials and condoms, and formulated to stay slick without stickiness.",
    details: [
      "150ml · approximately 300 pumps",
      "Water-based, glycerin and paraben free",
      "Toy and condom compatible",
      "Vegan formulation, dermatologist reviewed",
    ],
    options: { label: "Size", values: ["50ml", "150ml", "250ml"] },
    body: "Sealed, plain secondary carton.",
  },
  {
    id: "ac-08",
    name: "Ember Massage Oil & Candle Duo",
    house: "Kinfolk Rituals",
    category: "Wellness & Lifestyle",
    price: 46,
    image: massageOil,
    rating: 4.8,
    reviews: 268,
    tagline: "Amber oils, low-flame ritual, warm skin.",
    description:
      "A slow-burning body candle paired with a cold-press massage oil in odourless, almond and vetiver blends. Lit low, warmed between the palms, and made for unhurried evenings.",
    details: [
      "100ml amber dropper bottle",
      "180g coconut-wax body candle",
      "Skin-safe, non-staining cotton wick",
      "Scented: almond · vetiver · unscented",
    ],
    options: { label: "Scent", values: ["Almond", "Vetiver", "Unscented"] },
    body: "Boxed with a hand-tied gold ribbon.",
  },
  {
    id: "ac-09",
    name: "Halden Adjustable Cuff Set",
    house: "Onyx & Oak",
    category: "BDSM & Accessories",
    price: 74,
    image: restraintCuffs,
    rating: 4.6,
    reviews: 132,
    tagline: "Padded leather, quick-release gold hardware.",
    description:
      "Beginner-conscious restraints: plush-lined leather, four-point adjustability and a quick-release buckle you can find without looking. Includes a satin tether ribbon and a storage pouch.",
    details: [
      "Full-grain leather with memory-foam lining",
      "Quick-release safety buckle",
      "Adjustable 42–72cm wrist span",
      "Includes satin tether and velvet pouch",
    ],
    options: { label: "Hardware", values: ["Brushed Gold", "Black Oxide"] },
    body: "Delivered in a plain zip pouch inside a matte box.",
  },
  {
    id: "ac-10",
    name: "Solstice Intimate Wellness Gift Set",
    house: "Casa Serena",
    category: "Wellness & Lifestyle",
    price: 135,
    compareAt: 165,
    image: wellnessGiftset,
    badge: "Limited",
    isNew: true,
    rating: 4.9,
    reviews: 58,
    tagline: "Four rituals, one black box with a red ribbon.",
    description:
      "Our fullest edit in one presentation: a mini massager, a body candle, a travel lubricant and a rose-toned accessory, nested in moulded inserts. Made for anniversaries, housewarmings and apologies.",
    details: [
      "Four products, individually sealed",
      "Petal Mini massager included",
      "Moulded velvet-insert keepsake box",
      "Handwritten note card on request",
    ],
    options: { label: "Ribbon", values: ["Claret", "Gold"] },
    body: "Ribbon-tied, plain exterior, gift-ready.",
  },
];

export const navCategories: {
  name: Category | "New Arrivals";
  blurb: string;
  columns: { title: string; links: string[] }[];
  feature: { image: string; eyebrow: string; title: string; count: string };
}[] = [
  {
    name: "Vibrators & Massagers",
    blurb: "Wands, bullets, curves and everything quiet in between.",
    columns: [
      { title: "By Type", links: ["Wand Massagers", "Bullet & Mini", "Rabbit Shapes", "G-Spot", "Air-Pulse"] },
      { title: "By Feature", links: ["Rechargeable", "App Enabled", "Waterproof", "Travel Lock", "Beginner Friendly"] },
      { title: "Collections", links: ["The Quiet Edit", "First Purchase", "Luxury Tier", "Under $75"] },
    ],
    feature: {
      image: media.blackVelvet,
      eyebrow: "Most wanted",
      title: "The Nocturne Series",
      count: "42 products",
    },
  },
  {
    name: "Couples & Intimacy",
    blurb: "Shared rhythm — wearables, kits and guided evenings.",
    columns: [
      { title: "For Two", links: ["Wearable Vibrators", "Couples Kits", "Remote Control", "Massage Rituals"] },
      { title: "Evening Edit", links: ["Blindfolds", "Body Candles", "Warming Oils", "Date Night Box"] },
      { title: "Guides", links: ["Beginner's Guide to Two", "Communication Cards", "How We Curate"] },
    ],
    feature: {
      image: media.darkRoses,
      eyebrow: "New this week",
      title: "Vespers Intimacy Kit",
      count: "28 products",
    },
  },
  {
    name: "Lingerie & Apparel",
    blurb: "Lace, satin and robes cut to be kept, not hidden.",
    columns: [
      { title: "Silhouettes", links: ["Bra & Brief Sets", "Bodysuits", "Chemises", "Robes & Kimonos"] },
      { title: "Fabric", links: ["Leavers Lace", "Satin Silk", "Mesh & Tulle", "Stretch Jersey"] },
      { title: "Fit", links: ["Size Guide", "XS — XL Range", "Plus-Cut Styles", "Care Notes"] },
    ],
    feature: {
      image: media.robeBed,
      eyebrow: "Atelier pick",
      title: "Éclat Claret Lace",
      count: "63 products",
    },
  },
  {
    name: "Men's Collection",
    blurb: "Engineered massagers, sleeves, and considered grooming.",
    columns: [
      { title: "Devices", links: ["Strokers & Sleeves", "Massagers", "Cock Rings", "Prostate Edit"] },
      { title: "Essentials", links: ["Delay Sprays", "Tissues & Powders", "Enlargement Myths", "Grooming"] },
      { title: "Collections", links: ["The Quiet Grip", "Travel Ready", "Power Tier"] },
    ],
    feature: {
      image: media.blackTextile,
      eyebrow: "Staff favourite",
      title: "Gran Ridge Series",
      count: "51 products",
    },
  },
  {
    name: "Lubricants & Essentials",
    blurb: "Water, silicone and hybrid formulas, honestly labelled.",
    columns: [
      { title: "Formulas", links: ["Water-Based", "Silicone-Based", "Hybrid", "Warming & Flavoured"] },
      { title: "Care", links: ["Toy Cleaners", "Freshening Spray", "Powders", "Sensitive Skin"] },
      { title: "Understand", links: ["Ingredient Glossary", "pH Explained", "Compatibility Chart"] },
    ],
    feature: {
      image: media.apothecary,
      eyebrow: "Everyday",
      title: "Clarity Essentials",
      count: "37 products",
    },
  },
  {
    name: "BDSM & Accessories",
    blurb: "Soft restraints, implements and aftercare, safety-first.",
    columns: [
      { title: "Restraint", links: ["Cuffs & Anklets", "Rope & Ribbon", "Under-Bed Systems", "Clamps"] },
      { title: "Implements", links: ["Paddles & Crops", "Blindfolds", "Gags", "Training Kit"] },
      { title: "Play Safe", links: ["Safety Shears", "Aftercare Edit", "Negotiation Guide"] },
    ],
    feature: {
      image: media.roseMacro,
      eyebrow: "New",
      title: "Halden Hardware",
      count: "24 products",
    },
  },
  {
    name: "Wellness & Lifestyle",
    blurb: "Candles, oils, books and the smaller comforts.",
    columns: [
      { title: "Ritual", links: ["Body Candles", "Massage Oils", "Bath Soaks", "Incense"] },
      { title: "Lifestyle", links: ["Books & Guides", "Interior Objects", "Gift Cards", "Stocking Fillers"] },
      { title: "Wellbeing", links: ["Pelvic Training", "Sleep & Calm", "Skin Support"] },
    ],
    feature: {
      image: media.candleSet,
      eyebrow: "Gifting",
      title: "Solstice Gift Sets",
      count: "45 products",
    },
  },
  {
    name: "New Arrivals",
    blurb: "Freshly landed across every department.",
    columns: [
      { title: "Just In", links: ["This Week", "This Month", "Pre-Order", "Back In Stock"] },
      { title: "Edits", links: ["The Discovery Edit", "Luxury Tier", "Under $50"] },
      { title: "Never Missed", links: ["Restock Alerts", "New Arrivals Newsletter"] },
    ],
    feature: {
      image: media.redSilk,
      eyebrow: "Landing now",
      title: "Season of Claret",
      count: "19 products",
    },
  },
];

export const filterTabs: ("All" | Category | "New Arrivals")[] = [
  "All",
  "Vibrators & Massagers",
  "Couples & Intimacy",
  "Lingerie & Apparel",
  "Men's Collection",
  "Lubricants & Essentials",
  "BDSM & Accessories",
  "Wellness & Lifestyle",
  "New Arrivals",
];

export const categoryTiles = [
  {
    name: "Vibrators & Massagers" as Category,
    copy: "Quiet motors, sculpted heads, ten rhythms deep.",
    image: media.blackVelvet,
    count: "42 products",
  },
  {
    name: "Couples Collection" as Category,
    copy: "Wearables, kits and shared, unhurried evenings.",
    image: media.darkRoses,
    count: "28 products",
  },
  {
    name: "Lingerie & Apparel" as Category,
    copy: "Claret lace, weighted satin, robes that stay on.",
    image: media.robeBed,
    count: "63 products",
  },
  {
    name: "Men's Essentials" as Category,
    copy: "Engineered grip, real materials, no gimmicks.",
    image: media.blackTextile,
    count: "51 products",
  },
  {
    name: "Lubricants & Wellness" as Category,
    copy: "Honestly labelled formulas and everyday care.",
    image: media.apothecary,
    count: "37 products",
  },
  {
    name: "BDSM & Accessories" as Category,
    copy: "Soft restraint, considered hardware, aftercare.",
    image: media.roseMacro,
    count: "24 products",
  },
];

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
