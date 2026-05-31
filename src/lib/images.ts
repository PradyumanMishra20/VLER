type ImagePath = `/${string}`;
type ImageExtension = "jpg" | "png";

function normalizeForMatch(value: string) {
  return value
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/*
|--------------------------------------------------------------------------
| HOME
|--------------------------------------------------------------------------
*/

const HERO_SLIDES: readonly ImagePath[] = [
  "/images/home/hero-slide-01.jpg",
  "/images/home/hero-slide-02.jpg",
  "/images/home/hero-slide-03.jpg",
  "/images/home/hero-slide-04.jpg",
  "/images/home/hero-slide-05.jpg",
  "/images/home/hero-slide-06.jpg",
  "/images/home/hero-slide-07.jpg",
  "/images/home/hero-slide-08.jpg",
  "/images/home/hero-slide-09.jpg",
  "/images/home/hero-slide-10.jpg",
  "/images/home/hero-slide-11.jpg",
];

const LOOKBOOK_LAYERS: readonly ImagePath[] = [
  "/images/home/lookbook-layer-01.png",
  "/images/home/lookbook-layer-02.png",
  "/images/home/lookbook-layer-03.png",
];

const MATERIAL_FLEECE: ImagePath =
  "/images/home/material-fleece.jpg";

/*
|--------------------------------------------------------------------------
| LOOKBOOK
|--------------------------------------------------------------------------
*/

const LOOKBOOK_SCENES = [
  {
    src: "/images/lookbook/01-structure-in-motion.png" as ImagePath,
    title: "Structure in motion",
    caption: "Fall / Winter 25 — Look 01",
  },
  {
    src: "/images/lookbook/02-neutral-layers.png" as ImagePath,
    title: "Neutral layers",
    caption: "Look 02 — Outer shell over merino base",
  },
  {
    src: "/images/lookbook/03-everyday-presence.png" as ImagePath,
    title: "Everyday presence",
    caption: "Look 03 — Oversized fleece, wide denim",
  },
  {
    src: "/images/lookbook/04-transitional-form.png" as ImagePath,
    title: "Transitional form",
    caption: "Look 04 — Wool overcoat, technical trouser",
  },
  {
    src: "/images/lookbook/05-material-weight.png" as ImagePath,
    title: "Material weight",
    caption: "Look 05 — Heavyweight construction",
  },
];

/*
|--------------------------------------------------------------------------
| JOURNAL
|--------------------------------------------------------------------------
*/

const JOURNAL_BY_SLUG = {
  "understanding-fabric-weight":
    "/images/journal/understanding-fabric-weight.png" as ImagePath,

  "layering-transitional-weather":
    "/images/journal/layering-transitional-weather.png" as ImagePath,

  "minimal-wardrobe-essentials":
    "/images/journal/minimal-wardrobe-essentials.png" as ImagePath,

  "behind-the-collection":
    "/images/journal/behind-the-collection.png" as ImagePath,
} as const;

/*
|--------------------------------------------------------------------------
| ABOUT
|--------------------------------------------------------------------------
*/

const ABOUT = {
  studioEditorial:
    "/images/about/studio-editorial.png" as ImagePath,
} as const;

/*
|--------------------------------------------------------------------------
| COLLECTIONS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| COLLECTIONS
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| COLLECTIONS
|--------------------------------------------------------------------------
*/

const COLLECTIONS_BY_SLUG = {
  essentials:
    "/images/collections/essentials.png" as ImagePath,

  outerwear:
    "/images/collections/outerwear.png" as ImagePath,

  knitwear:
    "/images/collections/knitwear.png" as ImagePath,

  bottoms:
    "/images/collections/bottoms.png" as ImagePath,
} as const;

/*
|--------------------------------------------------------------------------
| PRODUCT FOLDERS
|--------------------------------------------------------------------------
*/

const PRODUCT_IMAGE_FOLDERS = [
  "acid-wash-oversized-tee-graphite",
  "blue-denim-baggy-jeans-male",
  "boxy-oversized-shirt-ecru",
  "brown-hoodie-female",
  "crew-sweatshirt-natural",
  "full-sleeve-tshirt",
  "grey-boxy-puffer-jacket",
  "half-sleeve-collar-tshirt",
  "heavyweight-oversized-tee-stone",
  "heavyweight-tee-black",
  "olive-puffer-jacket",
  "oversized-black-tee-male",
  "oversized-hoodie-female",
  "oversized-white-hoodie",
  "relaxed-cargo-trousers-charcoal",
  "relaxed-hoodie-graphite",
  "retro-wide-leg-jeans",
  "black-babytee-wideleg-female",
  "navy-longsleeve-wideleg-female",
  "utility-canvas-tote-natural",
  "utility-jacket-black",
  "washed-heavyweight-hoodie-ash",
  "wide-leg-jeans-female",
  "wide-leg-trousers-cream",
  "wool-overcoat-black",
  "charcoal-zip-hoodie",
  "boxy-cropped-jacket",
  "wide-pleated-trousers",
  "stone-washed-hoodie",
  "minimal-nylon-windbreaker",
  "technical-crossbody-bag",
  "washed-black-cap",
  "silver-chain-necklace",
  "ribbed-beanie-graphite",
  "leather-card-holder",
  "tactical-belt",
  "wool-scarf-stone",
  "matte-sunglasses",
] as const;

type ProductImageFolder =
  (typeof PRODUCT_IMAGE_FOLDERS)[number];

/*
|--------------------------------------------------------------------------
| IMAGE EXTENSION SYSTEM
|--------------------------------------------------------------------------
|
| Default:
| primary.jpg
| hover.jpg
|
| Add only exceptions here.
|
*/

/*
|--------------------------------------------------------------------------
| PRIMARY IMAGE PNG EXCEPTIONS
|--------------------------------------------------------------------------
*/

const PRODUCT_PRIMARY_EXTENSIONS: Partial<
  Record<ProductImageFolder, ImageExtension>
> = {
  "charcoal-zip-hoodie": "png",
  "minimal-nylon-windbreaker": "png",
  "stone-washed-hoodie": "png",
};

/*
|--------------------------------------------------------------------------
| HOVER IMAGE PNG EXCEPTIONS
|--------------------------------------------------------------------------
*/

const PRODUCT_HOVER_EXTENSIONS: Partial<
  Record<ProductImageFolder, ImageExtension>
> = {
  "washed-black-cap": "png",
};

/*
|--------------------------------------------------------------------------
| EXTENSION HELPERS
|--------------------------------------------------------------------------
*/

function getPrimaryExtension(
  folder: ProductImageFolder
): ImageExtension {
  return PRODUCT_PRIMARY_EXTENSIONS[folder] ?? "jpg";
}

function getHoverExtension(
  folder: ProductImageFolder
): ImageExtension {
  return PRODUCT_HOVER_EXTENSIONS[folder] ?? "jpg";
}

/*
|--------------------------------------------------------------------------
| PRODUCT SLUG ALIASES
|--------------------------------------------------------------------------
*/

const PRODUCT_SLUG_ALIASES: Partial<
  Record<string, ProductImageFolder>
> = {
  "structured-wool-overcoat-black":
    "wool-overcoat-black",

  "relaxed-technical-trouser-olive":
    "wide-leg-trousers-cream",

  "technical-shell-jacket-obsidian":
    "utility-jacket-black",

  "heavyweight-oversized-hoodie-obsidian":
    "oversized-hoodie-female",

  "quilted-liner-jacket-sand":
    "grey-boxy-puffer-jacket",

  "canvas-tote-natural":
    "utility-canvas-tote-natural",
};

/*
|--------------------------------------------------------------------------
| MATCHING SYSTEM
|--------------------------------------------------------------------------
*/

function folderToSlugMatchScore(
  folder: ProductImageFolder,
  slug: string
) {
  const folderNorm = normalizeForMatch(folder);
  const slugNorm = normalizeForMatch(slug);

  const slugTokens = slugNorm
    .split("-")
    .filter(Boolean);

  const folderTokens = folderNorm
    .split("-")
    .filter(Boolean);

  let score = 0;

  for (const token of slugTokens) {
    if (folderTokens.includes(token)) score += 10;
    if (folderNorm.includes(token)) score += 3;
  }

  if (
    folderNorm.includes(slugNorm) ||
    slugNorm.includes(folderNorm)
  ) {
    score += 30;
  }

  return score;
}

/*
|--------------------------------------------------------------------------
| RESOLVE PRODUCT FOLDER
|--------------------------------------------------------------------------
*/

export function resolveProductImageFolder(
  slug: string
): ProductImageFolder {
  const normalizedSlug = normalizeForMatch(slug);

  const alias =
    PRODUCT_SLUG_ALIASES[normalizedSlug];

  if (alias) return alias;

  let best: {
    folder: ProductImageFolder;
    score: number;
  } | null = null;

  for (const folder of PRODUCT_IMAGE_FOLDERS) {
    const score = folderToSlugMatchScore(
      folder,
      normalizedSlug
    );

    if (!best || score > best.score) {
      best = {
        folder,
        score,
      };
    }
  }

  return best?.folder ?? PRODUCT_IMAGE_FOLDERS[0];
}

/*
|--------------------------------------------------------------------------
| PRODUCT IMAGE HELPERS
|--------------------------------------------------------------------------
*/

export function productPrimary(
  slug: string
): ImagePath {
  const folder = resolveProductImageFolder(slug);

  const ext = getPrimaryExtension(folder);

  return `/images/products/${folder}/primary.${ext}` as ImagePath;
}

export function productHover(
  slug: string
): ImagePath {
  const folder = resolveProductImageFolder(slug);

  const ext = getHoverExtension(folder);

  return `/images/products/${folder}/hover.${ext}` as ImagePath;
}

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

export const IMAGES = {
  home: {
    heroSlides: HERO_SLIDES,
    lookbookLayers: LOOKBOOK_LAYERS,
    materialFleece: MATERIAL_FLEECE,
  },

  collections: {
    bySlug: COLLECTIONS_BY_SLUG,
  },

  lookbook: {
    scenes: LOOKBOOK_SCENES,
  },

  journal: {
    bySlug: JOURNAL_BY_SLUG,
  },

  about: ABOUT,

  products: {
    primary: productPrimary,
    hover: productHover,
  },
} as const;