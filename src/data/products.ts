import type { Product } from "@/types";
import { productHover, productPrimary } from "@/lib/images";

function createVariants(
  productId: string,
  sizes: string[],
  color: string,
  colorHex: string,
  baseStock: number
) {
  return sizes.map((size, i) => ({
    id: `${productId}-${color.toLowerCase()}-${size}`,
    size,
    color,
    colorHex,
    stock: Math.max(baseStock - i * 2, 0),
    sku: `VELR-${productId.toUpperCase()}-${size}`,
  }));
}

export const products: Product[] = [
  {
    id: "1",
    slug: "oversized-hoodie-female",
    name: "Heavyweight Oversized Hoodie",
    description: "Obsidian — Structured fleece with reinforced seams.",
    longDescription:
      "A heavyweight oversized hoodie cut from 480gsm brushed fleece. Designed with dropped shoulders, a double-layer hood, and ribbed cuffs built for repeated wear.",
    price: 5999,
    compareAtPrice: 7499,
    category: "tops",
    fit: "oversized",
    colors: ["Obsidian", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("oversized-hoodie-female"),
      productHover("oversized-hoodie-female"),
    ],
    hoverImage: productHover("oversized-hoodie-female"),
    variants: createVariants(
      "1",
      ["XS", "S", "M", "L", "XL"],
      "Obsidian",
      "#1A1A1A",
      24
    ),
    featured: true,
    isNew: true,
    collection: "fw25",
    materials: ["480gsm brushed fleece", "Cotton blend"],
    care: ["Machine wash cold", "Tumble dry low"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "2",
    slug: "wool-overcoat-black",
    name: "Structured Wool Overcoat",
    description: "Black — Tailored silhouette in wool blend.",
    longDescription:
      "A structured overcoat in premium wool blend with clean lapels, interior pockets, and full lining.",
    price: 12999,
    compareAtPrice: 14999,
    category: "outerwear",
    fit: "regular",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("wool-overcoat-black"),
      productHover("wool-overcoat-black"),
    ],
    hoverImage: productHover("wool-overcoat-black"),
    variants: createVariants(
      "2",
      ["S", "M", "L", "XL"],
      "Black",
      "#111111",
      10
    ),
    featured: true,
    collection: "fw25",
    materials: ["70% wool", "30% polyamide"],
    care: ["Dry clean only"],
    shipping: "Ships within 3–5 business days.",
  },

  {
    id: "3",
    slug: "boxy-oversized-shirt-ecru",
    name: "Boxy Oversized Shirt",
    description: "Ecru — Structured oversized silhouette.",
    longDescription:
      "A structured oversized shirt designed for layering with clean proportions and premium cotton twill.",
    price: 2999,
    category: "tops",
    fit: "oversized",
    colors: ["Ecru"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("boxy-oversized-shirt-ecru"),
      productHover("boxy-oversized-shirt-ecru"),
    ],
    hoverImage: productHover("boxy-oversized-shirt-ecru"),
    variants: createVariants(
      "3",
      ["XS", "S", "M", "L", "XL"],
      "Ecru",
      "#E8E3DA",
      28
    ),
    featured: true,
    collection: "essentials",
    materials: ["100% cotton twill"],
    care: ["Machine wash cold"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "4",
    slug: "utility-jacket-black",
    name: "Utility Jacket",
    description: "Black — Functional oversized utility shell.",
    longDescription:
      "Technical utility jacket with oversized proportions, storm flap construction, and durable shell fabric.",
    price: 8999,
    compareAtPrice: 11999,
    category: "outerwear",
    fit: "oversized",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("utility-jacket-black"),
      productHover("utility-jacket-black"),
    ],
    hoverImage: productHover("utility-jacket-black"),
    variants: createVariants(
      "4",
      ["S", "M", "L", "XL"],
      "Black",
      "#111111",
      14
    ),
    featured: true,
    collection: "fw25",
    materials: ["Technical nylon shell"],
    care: ["Machine wash cold"],
    shipping: "Ships within 3–5 business days.",
  },

  {
    id: "5",
    slug: "relaxed-cargo-trousers-charcoal",
    name: "Relaxed Cargo Trousers",
    description: "Charcoal — Relaxed cargo silhouette.",
    longDescription:
      "Relaxed cargo trousers with articulated knees, reinforced construction, and clean taper.",
    price: 4999,
    category: "bottoms",
    fit: "relaxed",
    colors: ["Charcoal"],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      productPrimary("relaxed-cargo-trousers-charcoal"),
      productHover("relaxed-cargo-trousers-charcoal"),
    ],
    hoverImage: productHover("relaxed-cargo-trousers-charcoal"),
    variants: createVariants(
      "5",
      ["28", "30", "32", "34", "36"],
      "Charcoal",
      "#3D3D3D",
      20
    ),
    collection: "essentials",
    materials: ["Nylon ripstop"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "6",
    slug: "utility-canvas-tote-natural",
    name: "Utility Canvas Tote",
    description: "Natural — Heavyweight utility tote.",
    longDescription:
      "Structured utility tote in heavyweight canvas with reinforced handles and interior storage.",
    price: 1799,
    category: "accessories",
    fit: "regular",
    colors: ["Natural"],
    sizes: ["One Size"],
    images: [
      productPrimary("utility-canvas-tote-natural"),
      productHover("utility-canvas-tote-natural"),
    ],
    hoverImage: productHover("utility-canvas-tote-natural"),
    variants: createVariants(
      "6",
      ["One Size"],
      "Natural",
      "#D6D0C7",
      40
    ),
    collection: "essentials",
    materials: ["18oz canvas"],
    care: ["Spot clean only"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "7",
    slug: "heavyweight-oversized-tee-stone",
    name: "Heavyweight Oversized Tee",
    description: "Stone — Heavy cotton oversized fit.",
    longDescription:
      "A heavyweight oversized tee with dropped shoulders and premium structured cotton.",
    price: 2499,
    compareAtPrice: 3499,
    category: "tops",
    fit: "oversized",
    colors: ["Stone"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("heavyweight-oversized-tee-stone"),
      productHover("heavyweight-oversized-tee-stone"),
    ],
    hoverImage: productHover("heavyweight-oversized-tee-stone"),
    variants: createVariants(
      "7",
      ["S", "M", "L", "XL"],
      "Stone",
      "#A9A39A",
      24
    ),
    featured: true,
    isNew: true,
    collection: "fw25",
    materials: ["240gsm organic cotton"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "8",
    slug: "acid-wash-oversized-tee-graphite",
    name: "Acid Wash Oversized Tee",
    description: "Graphite — Vintage washed oversized tee.",
    longDescription:
      "Heavyweight oversized tee finished with an acid wash treatment for a vintage look.",
    price: 2199,
    category: "tops",
    fit: "oversized",
    colors: ["Graphite"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("acid-wash-oversized-tee-graphite"),
      productHover("acid-wash-oversized-tee-graphite"),
    ],
    hoverImage: productHover("acid-wash-oversized-tee-graphite"),
    variants: createVariants(
      "8",
      ["S", "M", "L", "XL"],
      "Graphite",
      "#4A4A4A",
      50
    ),
    collection: "essentials",
    materials: ["240gsm cotton"],
    care: ["Machine wash cold"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "9",
    slug: "washed-heavyweight-hoodie-ash",
    name: "Washed Heavyweight Hoodie",
    description: "Ash — Vintage washed heavyweight hoodie.",
    longDescription:
      "Heavyweight hoodie with washed treatment, oversized structure, and soft fleece interior.",
    price: 5499,
    category: "tops",
    fit: "oversized",
    colors: ["Ash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("washed-heavyweight-hoodie-ash"),
      productHover("washed-heavyweight-hoodie-ash"),
    ],
    hoverImage: productHover("washed-heavyweight-hoodie-ash"),
    variants: createVariants(
      "9",
      ["XS", "S", "M", "L", "XL"],
      "Ash",
      "#9A9590",
      18
    ),
    collection: "fw25",
    materials: ["480gsm fleece"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "10",
    slug: "blue-denim-baggy-jeans-male",
    name: "Blue Denim Baggy Jeans",
    description: "Indigo — Relaxed baggy denim.",
    longDescription:
      "Baggy denim with heavyweight construction and relaxed silhouette.",
    price: 5499,
    compareAtPrice: 6999,
    category: "bottoms",
    fit: "relaxed",
    colors: ["Indigo"],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      productPrimary("blue-denim-baggy-jeans-male"),
      productHover("blue-denim-baggy-jeans-male"),
    ],
    hoverImage: productHover("blue-denim-baggy-jeans-male"),
    variants: createVariants(
      "10",
      ["28", "30", "32", "34", "36"],
      "Indigo",
      "#2A3B5A",
      20
    ),
    featured: true,
    bestseller: true,
    collection: "fw25",
    materials: ["Heavy denim"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "11",
    slug: "retro-wide-leg-jeans",
    name: "Retro Wide-Leg Jeans",
    description: "Indigo — Vintage inspired wide-leg denim.",
    longDescription:
      "Wide-leg denim silhouette inspired by vintage proportions with structured drape.",
    price: 5799,
    category: "bottoms",
    fit: "relaxed",
    colors: ["Indigo"],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      productPrimary("retro-wide-leg-jeans"),
      productHover("retro-wide-leg-jeans"),
    ],
    hoverImage: productHover("retro-wide-leg-jeans"),
    variants: createVariants(
      "11",
      ["28", "30", "32", "34", "36"],
      "Indigo",
      "#283A55",
      18
    ),
    bestseller: true,
    featured: true,
    isNew: true,
    collection: "fw25",
    materials: ["Premium denim"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "12",
    slug: "wide-leg-jeans-female",
    name: "Wide-Leg Jeans",
    description: "Natural — Relaxed editorial silhouette.",
    longDescription:
      "Wide-leg denim designed with elongated proportions and relaxed movement.",
    price: 4499,
    category: "bottoms",
    fit: "relaxed",
    colors: ["Natural"],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      productPrimary("wide-leg-jeans-female"),
      productHover("wide-leg-jeans-female"),
    ],
    hoverImage: productHover("wide-leg-jeans-female"),
    variants: createVariants(
      "12",
      ["28", "30", "32", "34", "36"],
      "Natural",
      "#CBBFA9",
      16
    ),
    collection: "essentials",
    materials: ["Denim blend"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "13",
    slug: "crew-sweatshirt-natural",
    name: "Crew Sweatshirt",
    description: "Natural — Structured brushed fleece.",
    longDescription:
      "Minimal crew sweatshirt with brushed interior and structured outer surface.",
    price: 4299,
    category: "tops",
    fit: "regular",
    colors: ["Natural"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("crew-sweatshirt-natural"),
      productHover("crew-sweatshirt-natural"),
    ],
    hoverImage: productHover("crew-sweatshirt-natural"),
    variants: createVariants(
      "13",
      ["XS", "S", "M", "L", "XL"],
      "Natural",
      "#CBBFA9",
      26
    ),
    featured: true,
    collection: "essentials",
    materials: ["Brushed fleece"],
    care: ["Machine wash cold"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "14",
    slug: "full-sleeve-tshirt",
    name: "Full Sleeve T-Shirt",
    description: "Stone — Minimal layered essential.",
    longDescription:
      "Balanced long sleeve tee designed for layering and clean silhouettes.",
    price: 2299,
    category: "tops",
    fit: "regular",
    colors: ["Stone"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("full-sleeve-tshirt"),
      productHover("full-sleeve-tshirt"),
    ],
    hoverImage: productHover("full-sleeve-tshirt"),
    variants: createVariants(
      "14",
      ["XS", "S", "M", "L", "XL"],
      "Stone",
      "#AFA79C",
      34
    ),
    bestseller: true,
    collection: "essentials",
    materials: ["Cotton blend"],
    care: ["Machine wash cold"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "15",
    slug: "half-sleeve-collar-tshirt",
    name: "Half Sleeve Collar T-Shirt",
    description: "Ecru — Minimal collar tee.",
    longDescription:
      "Soft structured collar tee with refined proportions and lightweight comfort.",
    price: 2499,
    category: "tops",
    fit: "slim",
    colors: ["Ecru"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("half-sleeve-collar-tshirt"),
      productHover("half-sleeve-collar-tshirt"),
    ],
    hoverImage: productHover("half-sleeve-collar-tshirt"),
    variants: createVariants(
      "15",
      ["XS", "S", "M", "L", "XL"],
      "Ecru",
      "#E8E0D3",
      32
    ),
    featured: true,
    collection: "essentials",
    materials: ["Cotton jersey"],
    care: ["Machine wash cold"],
    shipping: "Ships within 1–3 business days.",
  },

  {
    id: "16",
    slug: "heavyweight-tee-black",
    name: "Heavyweight Tee",
    description: "Black — Structured heavyweight tee.",
    longDescription:
      "Heavyweight black tee with premium collar construction and oversized drape.",
    price: 2799,
    compareAtPrice: 3499,
    category: "tops",
    fit: "oversized",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("heavyweight-tee-black"),
      productHover("heavyweight-tee-black"),
    ],
    hoverImage: productHover("heavyweight-tee-black"),
    variants: createVariants(
      "16",
      ["XS", "S", "M", "L", "XL"],
      "Black",
      "#111111",
      28
    ),
    featured: true,
    collection: "fw25",
    materials: ["Heavy cotton knit"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "17",
    slug: "oversized-black-tee-male",
    name: "Oversized Black Tee",
    description: "Black — Editorial oversized silhouette.",
    longDescription:
      "Oversized black tee designed for minimal styling and premium everyday wear.",
    price: 2199,
    category: "tops",
    fit: "oversized",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("oversized-black-tee-male"),
      productHover("oversized-black-tee-male"),
    ],
    hoverImage: productHover("oversized-black-tee-male"),
    variants: createVariants(
      "17",
      ["S", "M", "L", "XL"],
      "Black",
      "#111111",
      24
    ),
    collection: "fw25",
    materials: ["240gsm cotton"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "18",
    slug: "relaxed-hoodie-graphite",
    name: "Relaxed Hoodie",
    description: "Graphite — Relaxed fleece hoodie.",
    longDescription:
      "Soft relaxed hoodie with dropped shoulders and durable ribbing.",
    price: 4999,
    compareAtPrice: 6499,
    category: "tops",
    fit: "relaxed",
    colors: ["Graphite"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      productPrimary("relaxed-hoodie-graphite"),
      productHover("relaxed-hoodie-graphite"),
    ],
    hoverImage: productHover("relaxed-hoodie-graphite"),
    variants: createVariants(
      "18",
      ["XS", "S", "M", "L", "XL"],
      "Graphite",
      "#4A4A4A",
      18
    ),
    featured: true,
    collection: "fw25",
    materials: ["Brushed fleece"],
    care: ["Machine wash cold"],
    shipping: "Ships within 2–4 business days.",
  },

  {
    id: "19",
    slug: "olive-puffer-jacket",
    name: "Olive Puffer Jacket",
    description: "Olive — Sculpted insulated outerwear.",
    longDescription:
      "Premium insulated puffer jacket with clean shell construction and editorial proportions.",
    price: 11999,
    compareAtPrice: 14999,
    category: "outerwear",
    fit: "regular",
    colors: ["Olive"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      productPrimary("olive-puffer-jacket"),
      productHover("olive-puffer-jacket"),
    ],
    hoverImage: productHover("olive-puffer-jacket"),
    variants: createVariants(
      "19",
      ["S", "M", "L", "XL"],
      "Olive",
      "#4A5240",
      10
    ),
    featured: true,
    isNew: true,
    collection: "fw25",
    materials: ["Technical nylon shell"],
    care: ["Machine wash cold"],
    shipping: "Ships within 3–5 business days.",
  },
  {
  id: "20",
  slug: "brown-hoodie-female",
  name: "Brown Hoodie",
  description: "Brown — Relaxed heavyweight fleece silhouette.",
  longDescription:
    "A heavyweight brown hoodie designed with dropped shoulders, structured cuffs, and a soft brushed interior for everyday layering.",
  price: 5299,
  category: "tops",
  fit: "oversized",
  colors: ["Brown"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    productPrimary("brown-hoodie-female"),
    productHover("brown-hoodie-female"),
  ],
  hoverImage: productHover("brown-hoodie-female"),
  variants: createVariants(
    "20",
    ["XS", "S", "M", "L", "XL"],
    "Brown",
    "#5A4638",
    18
  ),
  featured: true,
  isNew: true,
  collection: "fw25",
  materials: ["Brushed fleece", "Cotton-poly blend"],
  care: ["Machine wash cold", "Tumble dry low"],
  shipping: "Ships within 2–4 business days.",
},

{
  id: "21",
  slug: "grey-boxy-puffer-jacket",
  name: "Grey Boxy Puffer Jacket",
  description: "Grey — Oversized insulated puffer silhouette.",
  longDescription:
    "A boxy puffer jacket with oversized structure, insulated padding, and a matte technical shell designed for winter layering.",
  price: 12999,
  compareAtPrice: 14999,
  category: "outerwear",
  fit: "oversized",
  colors: ["Grey"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    productPrimary("grey-boxy-puffer-jacket"),
    productHover("grey-boxy-puffer-jacket"),
  ],
  hoverImage: productHover("grey-boxy-puffer-jacket"),
  variants: createVariants(
    "25",
    ["S", "M", "L", "XL"],
    "Grey",
    "#6B6B6B",
    12
  ),
  featured: true,
  isNew: true,
  collection: "fw25",
  materials: ["Technical nylon shell", "Synthetic insulation"],
  care: ["Machine wash cold"],
  shipping: "Ships within 3–5 business days.",
},
{
  id: "22",
  slug: "black-babytee-wideleg-female",
  name: "Black Baby Tee & Wide-Leg Pants",
  description: "Black — Minimal fitted baby tee with relaxed trousers.",
  longDescription:
    "A fitted baby tee styled with relaxed wide-leg trousers, designed for balanced proportions and clean everyday wear.",
  price: 3299,
  category: "tops",
  fit: "slim",
  colors: ["Black"],
  sizes: ["XS", "S", "M", "L"],
  images: [
    productPrimary("black-babytee-wideleg-female"),
    productHover("black-babytee-wideleg-female"),
  ],
  hoverImage: productHover("black-babytee-wideleg-female"),
  variants: createVariants(
    "22",
    ["XS", "S", "M", "L"],
    "Black",
    "#111111",
    22
  ),
  featured: true,
  bestseller: true,
  isNew: true,
  collection: "essentials",
  materials: ["Cotton jersey", "Soft stretch blend"],
  care: ["Machine wash cold"],
  shipping: "Ships within 1–3 business days.",
},

{
  id: "23",
  slug: "navy-longsleeve-wideleg-female",
  name: "Navy Long Sleeve & Wide-Leg Pants",
  description: "Navy — Relaxed long sleeve paired with fluid trousers.",
  longDescription:
    "A relaxed navy long sleeve styled with wide-leg trousers for a soft editorial silhouette and comfortable movement.",
  price: 3499,
  compareAtPrice: 4499,
  category: "tops",
  fit: "relaxed",
  colors: ["Navy"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    productPrimary("navy-longsleeve-wideleg-female"),
    productHover("navy-longsleeve-wideleg-female"),
  ],
  hoverImage: productHover("navy-longsleeve-wideleg-female"),
  variants: createVariants(
    "23",
    ["XS", "S", "M", "L", "XL"],
    "Navy",
    "#1E2A44",
    16
  ),
  featured: false,
  bestseller: true,
  isNew: true,
  collection: "fw25",
  materials: ["Soft cotton blend"],
  care: ["Machine wash cold"],
  shipping: "Ships within 2–4 business days.",
},

{
  id: "24",
  slug: "wide-leg-trousers-cream",
  name: "Wide-Leg Trousers",
  description: "Cream — Relaxed tailored wide-leg silhouette.",
  longDescription:
    "Wide-leg cream trousers with fluid structure, clean pleating, and a tailored waistband designed for elevated daily wear.",
  price: 4799,
  category: "bottoms",
  fit: "relaxed",
  colors: ["Cream"],
  sizes: ["28", "30", "32", "34", "36"],
  images: [
    productPrimary("wide-leg-trousers-cream"),
    productHover("wide-leg-trousers-cream"),
  ],
  hoverImage: productHover("wide-leg-trousers-cream"),
  variants: createVariants(
    "24",
    ["28", "30", "32", "34", "36"],
    "Cream",
    "#E5DDD0",
    20
  ),
  featured: true,
  isNew: false,
  collection: "essentials",
  materials: ["Structured cotton blend"],
  care: ["Machine wash cold", "Line dry"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "25",
  slug: "oversized-white-hoodie",
  name: "Oversized White Hoodie",
  description: "White — Relaxed oversized fleece hoodie.",
  longDescription:
    "An oversized white hoodie with heavyweight brushed fleece, dropped shoulders, and a clean minimal silhouette built for layered styling.",
  price: 5799,
  category: "tops",
  fit: "oversized",
  colors: ["White"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    productPrimary("oversized-white-hoodie"),
    productHover("oversized-white-hoodie"),
  ],
  hoverImage: productHover("oversized-white-hoodie"),
  variants: createVariants(
    "27",
    ["XS", "S", "M", "L", "XL"],
    "White",
    "#F1F1F1",
    18
  ),
  featured: false,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["480gsm brushed fleece"],
  care: ["Machine wash cold", "Tumble dry low"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "26",
  slug: "charcoal-zip-hoodie",
  name: "Charcoal Zip Hoodie",
  description: "Charcoal — Relaxed zip-up fleece silhouette.",
  longDescription:
    "A heavyweight zip hoodie with washed charcoal tones, dropped shoulders, and premium brushed fleece construction.",
  price: 5999,
  compareAtPrice: 7499,
  category: "tops",
  fit: "oversized",
  colors: ["Charcoal"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    productPrimary("charcoal-zip-hoodie"),
    productHover("charcoal-zip-hoodie"),
  ],
  hoverImage: productHover("charcoal-zip-hoodie"),
  variants: createVariants(
    "26",
    ["XS", "S", "M", "L", "XL"],
    "Charcoal",
    "#3A3A3A",
    18
  ),
  featured: true,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["Brushed heavyweight fleece"],
  care: ["Machine wash cold"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "27",
  slug: "boxy-cropped-jacket",
  name: "Boxy Cropped Jacket",
  description: "Black — Cropped structured outerwear silhouette.",
  longDescription:
    "A cropped boxy jacket designed with sharp proportions, matte textures, and minimal detailing.",
  price: 8499,
  category: "outerwear",
  fit: "regular",
  colors: ["Black"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    productPrimary("boxy-cropped-jacket"),
    productHover("boxy-cropped-jacket"),
  ],
  hoverImage: productHover("boxy-cropped-jacket"),
  variants: createVariants(
    "27",
    ["S", "M", "L", "XL"],
    "Black",
    "#111111",
    12
  ),
  featured: true,
  bestseller: true,
  isNew: true,
  collection: "fw25",
  materials: ["Technical cotton blend"],
  care: ["Dry clean only"],
  shipping: "Ships within 3–5 business days.",
},
{
  id: "28",
  slug: "wide-pleated-trousers",
  name: "Wide Pleated Trousers",
  description: "Stone — Relaxed tailored wide-leg trousers.",
  longDescription:
    "Wide pleated trousers designed with fluid drape, clean pleats, and relaxed editorial proportions.",
  price: 4299,
  category: "bottoms",
  fit: "relaxed",
  colors: ["Stone"],
  sizes: ["28", "30", "32", "34", "36"],
  images: [
    productPrimary("wide-pleated-trousers"),
    productHover("wide-pleated-trousers"),
  ],
  hoverImage: productHover("wide-pleated-trousers"),
  variants: createVariants(
    "28",
    ["28", "30", "32", "34", "36"],
    "Stone",
    "#B8AEA0",
    20
  ),
  featured: true,
  bestseller: false,
  isNew: true,
  collection: "essentials",
  materials: ["Structured viscose blend"],
  care: ["Machine wash cold"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "29",
  slug: "stone-washed-hoodie",
  name: "Stone Washed Hoodie",
  description: "Stone — Vintage washed oversized hoodie.",
  longDescription:
    "A washed heavyweight hoodie featuring faded tones, oversized structure, and soft brushed lining.",
  price: 4999,
  compareAtPrice: 6999,
  category: "tops",
  fit: "oversized",
  colors: ["Stone"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    productPrimary("stone-washed-hoodie"),
    productHover("stone-washed-hoodie"),
  ],
  hoverImage: productHover("stone-washed-hoodie"),
  variants: createVariants(
    "29",
    ["XS", "S", "M", "L", "XL"],
    "Stone",
    "#A89F93",
    22
  ),
  featured: true,
  bestseller: true,
  isNew: false,
  collection: "fw25",
  materials: ["Heavy fleece cotton"],
  care: ["Machine wash cold"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "30",
  slug: "minimal-nylon-windbreaker",
  name: "Minimal Nylon Windbreaker",
  description: "Black — Lightweight technical windbreaker.",
  longDescription:
    "A lightweight nylon windbreaker designed with matte shell fabric, clean seams, and minimal utility detailing.",
  price: 7999,
  category: "outerwear",
  fit: "regular",
  colors: ["Black"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    productPrimary("minimal-nylon-windbreaker"),
    productHover("minimal-nylon-windbreaker"),
  ],
  hoverImage: productHover("minimal-nylon-windbreaker"),
  variants: createVariants(
    "30",
    ["S", "M", "L", "XL"],
    "Black",
    "#111111",
    16
  ),
  featured: false,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["Technical nylon shell"],
  care: ["Machine wash cold"],
  shipping: "Ships within 2–4 business days.",
},
{
  id: "31",
  slug: "technical-crossbody-bag",
  name: "Technical Crossbody Bag",
  description: "Black — Compact utility crossbody silhouette.",
  longDescription:
    "A minimal technical crossbody bag with matte nylon construction, adjustable straps, and clean everyday utility storage.",
  price: 2499,
  compareAtPrice: 3299,
  category: "accessories",
  fit: "regular",
  colors: ["Black"],
  sizes: ["One Size"],
  images: [
    productPrimary("technical-crossbody-bag"),
    productHover("technical-crossbody-bag"),
  ],
  hoverImage: productHover("technical-crossbody-bag"),
  variants: createVariants(
    "31",
    ["One Size"],
    "Black",
    "#111111",
    28
  ),
  featured: true,
  bestseller: true,
  isNew: true,
  collection: "essentials",
  materials: ["Technical nylon"],
  care: ["Spot clean only"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "32",
  slug: "silver-chain-necklace",
  name: "Silver Chain Necklace",
  description: "Silver — Minimal polished chain accessory.",
  longDescription:
    "A polished silver-tone chain necklace designed for subtle layering and minimal styling.",
  price: 1499,
  category: "accessories",
  fit: "regular",
  colors: ["Silver"],
  sizes: ["One Size"],
  images: [
    productPrimary("silver-chain-necklace"),
    productHover("silver-chain-necklace"),
  ],
  hoverImage: productHover("silver-chain-necklace"),
  variants: createVariants(
    "32",
    ["One Size"],
    "Silver",
    "#C0C0C0",
    18
  ),
  featured: true,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["Stainless steel"],
  care: ["Wipe clean only"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "33",
  slug: "ribbed-beanie-graphite",
  name: "Ribbed Beanie",
  description: "Graphite — Soft ribbed winter beanie.",
  longDescription:
    "A soft ribbed graphite beanie designed with stretch comfort and minimal cold-weather styling.",
  price: 999,
  category: "accessories",
  fit: "regular",
  colors: ["Graphite"],
  sizes: ["One Size"],
  images: [
    productPrimary("ribbed-beanie-graphite"),
    productHover("ribbed-beanie-graphite"),
  ],
  hoverImage: productHover("ribbed-beanie-graphite"),
  variants: createVariants(
    "33",
    ["One Size"],
    "Graphite",
    "#4A4A4A",
    32
  ),
  featured: false,
  bestseller: true,
  isNew: false,
  collection: "fw25",
  materials: ["Soft acrylic knit"],
  care: ["Hand wash cold"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "34",
  slug: "leather-card-holder",
  name: "Leather Card Holder",
  description: "Black — Minimal everyday leather wallet.",
  longDescription:
    "A compact leather card holder crafted with matte texture, clean edge finishing, and minimal pocket storage.",
  price: 1999,
  category: "accessories",
  fit: "regular",
  colors: ["Black"],
  sizes: ["One Size"],
  images: [
    productPrimary("leather-card-holder"),
    productHover("leather-card-holder"),
  ],
  hoverImage: productHover("leather-card-holder"),
  variants: createVariants(
    "34",
    ["One Size"],
    "Black",
    "#111111",
    22
  ),
  featured: false,
  bestseller: false,
  isNew: true,
  collection: "essentials",
  materials: ["Genuine leather"],
  care: ["Keep away from water"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "35",
  slug: "tactical-belt",
  name: "Tactical Belt",
  description: "Black — Utility-inspired minimal belt.",
  longDescription:
    "A matte tactical belt designed with durable woven construction and minimal metal hardware.",
  price: 1299,
  category: "accessories",
  fit: "regular",
  colors: ["Black"],
  sizes: ["S", "M", "L"],
  images: [
    productPrimary("tactical-belt"),
    productHover("tactical-belt"),
  ],
  hoverImage: productHover("tactical-belt"),
  variants: createVariants(
    "35",
    ["S", "M", "L"],
    "Black",
    "#111111",
    34
  ),
  featured: false,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["Woven nylon"],
  care: ["Wipe clean only"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "36",
  slug: "wool-scarf-stone",
  name: "Wool Scarf",
  description: "Stone — Soft oversized winter scarf.",
  longDescription:
    "An oversized wool scarf with soft brushed texture and neutral tones designed for winter layering.",
  price: 2499,
  category: "accessories",
  fit: "oversized",
  colors: ["Stone"],
  sizes: ["One Size"],
  images: [
    productPrimary("wool-scarf-stone"),
    productHover("wool-scarf-stone"),
  ],
  hoverImage: productHover("wool-scarf-stone"),
  variants: createVariants(
    "36",
    ["One Size"],
    "Stone",
    "#B8AEA0",
    16
  ),
  featured: true,
  bestseller: false,
  isNew: true,
  collection: "fw25",
  materials: ["Wool blend"],
  care: ["Dry clean only"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "37",
  slug: "matte-sunglasses",
  name: "Matte Sunglasses",
  description: "Black — Slim matte-frame eyewear.",
  longDescription:
    "Minimal matte sunglasses with dark lenses, lightweight construction, and clean editorial styling.",
  price: 2999,
  compareAtPrice: 3499,
  category: "accessories",
  fit: "regular",
  colors: ["Black"],
  sizes: ["One Size"],
  images: [
    productPrimary("matte-sunglasses"),
    productHover("matte-sunglasses"),
  ],
  hoverImage: productHover("matte-sunglasses"),
  variants: createVariants(
    "37",
    ["One Size"],
    "Black",
    "#111111",
    12
  ),
  featured: true,
  bestseller: true,
  isNew: true,
  collection: "fw25",
  materials: ["Acetate frame"],
  care: ["Use microfiber cloth"],
  shipping: "Ships within 1–3 business days.",
},
{
  id: "38",
  slug: "washed-black-cap",
  name: "Washed Black Cap",
  description: "Black — Minimal washed cotton cap.",
  longDescription:
    "A washed black cap designed with curved structure, soft cotton construction, and understated everyday styling.",
  price: 1199,
  category: "accessories",
  fit: "regular",
  colors: ["Black"],
  sizes: ["One Size"],
  images: [
    productPrimary("washed-black-cap"),
    productHover("washed-black-cap"),
  ],
  hoverImage: productHover("washed-black-cap"),
  variants: createVariants(
    "38",
    ["One Size"],
    "Black",
    "#111111",
    28
  ),
  featured: false,
  bestseller: true,
  isNew: true,
  collection: "essentials",
  materials: ["Washed cotton"],
  care: ["Spot clean only"],
  shipping: "Ships within 1–3 business days.",
},
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((product) => product.bestseller);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((product) => product.collection === collection);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew);
}

export const COLLECTIONS = [
  { id: "fw25", name: "Fall/Winter 25", description: "The latest seasonal collection" },
  { id: "essentials", name: "Essentials", description: "Everyday wardrobe staples" },
];

export const CATEGORIES = [
  { id: "tops", name: "Tops" },
  { id: "outerwear", name: "Outerwear" },
  { id: "bottoms", name: "Bottoms" },
  { id: "accessories", name: "Accessories" },
];

export const FITS = [
  { id: "oversized", name: "Oversized" },
  { id: "regular", name: "Regular" },
  { id: "relaxed", name: "Relaxed" },
  { id: "slim", name: "Slim" },
];
