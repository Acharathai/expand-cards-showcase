import pantsBlack from "@/assets/p-pants-black.jpg";
import pantsNavy from "@/assets/p-pants-navy.jpg";
import pantsGrey from "@/assets/p-pants-grey.jpg";
import teeWhite from "@/assets/p-tee-white.jpg";
import teeBlack from "@/assets/p-tee-black.jpg";
import shirtBeige from "@/assets/p-shirt-beige.jpg";
import hoodieGrey from "@/assets/p-hoodie-grey.jpg";
import sneakerWhite from "@/assets/p-sneaker-white.jpg";

export type Product = {
  id: string;
  brand: string;
  title: string;
  category: string;
  categoryLabel: string;
  images: string[];
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  price: number;
  originalPrice: number;
  discount: number;
  badge?: string;
  offer?: string;
  inStock: boolean;
  createdAt: number;
  popularity: number;
};

export const CURRENCY = "₹";

export function formatPrice(value: number, currency = CURRENCY) {
  return `${currency}${value.toLocaleString("en-IN")}`;
}

const IMAGE_POOL = [
  pantsBlack,
  pantsNavy,
  pantsGrey,
  teeWhite,
  teeBlack,
  shirtBeige,
  hoodieGrey,
  sneakerWhite,
];

export const BRANDS = [
  "Atelier®",
  "Northbound",
  "Studio 41",
  "Kōsa",
  "Raw Thread",
  "Meridian",
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLOR_OPTIONS = [
  { hex: "#111114", name: "Black" },
  { hex: "#27324A", name: "Navy" },
  { hex: "#D8D0C5", name: "Sand" },
  { hex: "#7C8A80", name: "Sage" },
  { hex: "#8A5A44", name: "Clay" },
  { hex: "#F3F1EC", name: "Off White" },
  { hex: "#6B6F76", name: "Graphite" },
];

const BADGES = [
  undefined,
  "OVERSIZED FIT",
  "NEW",
  "BESTSELLER",
  "TRENDING",
  "LIMITED",
];

const OFFERS = [
  undefined,
  "Buy 3 get 10% off",
  "Buy 2 get 5% off",
  "Extra 10% off",
  "Free shipping",
  "Limited-time deal",
];

const DESCRIPTORS = [
  "Relaxed",
  "Oversized",
  "Everyday",
  "Structured",
  "Washed",
  "Heavyweight",
  "Tapered",
  "Boxy",
];

const COLOR_WORDS = ["Jet Black", "Deep Navy", "Sand", "Sage", "Clay", "Off White", "Graphite"];

/** Deterministic pseudo-random generator so listings are stable across renders. */
function makeRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

const pick = <T,>(arr: T[], r: number) => arr[Math.floor(r * arr.length) % arr.length] as T;

export function generateProducts(
  slug: string,
  categoryLabel: string,
  count: number,
): Product[] {
  const rnd = makeRandom(slug);
  const out: Product[] = [];

  for (let i = 0; i < count; i++) {
    const imgStart = Math.floor(rnd() * IMAGE_POOL.length);
    const imageCount = 3 + Math.floor(rnd() * 2);
    const images = Array.from(
      { length: imageCount },
      (_, k) => IMAGE_POOL[(imgStart + k) % IMAGE_POOL.length]!,
    );

    const originalPrice = 799 + Math.floor(rnd() * 24) * 150;
    const discount = 10 + Math.floor(rnd() * 9) * 5;
    const price = Math.round((originalPrice * (100 - discount)) / 100 / 10) * 10;

    const colorCount = 2 + Math.floor(rnd() * 5);
    const colorStart = Math.floor(rnd() * COLOR_OPTIONS.length);
    const colors = Array.from(
      { length: colorCount },
      (_, k) => COLOR_OPTIONS[(colorStart + k) % COLOR_OPTIONS.length]!.hex,
    );

    const sizeStart = Math.floor(rnd() * 2);
    const sizes = SIZES.slice(sizeStart, sizeStart + 3 + Math.floor(rnd() * 4));

    out.push({
      id: `${slug}-${i + 1}`,
      brand: pick(BRANDS, rnd()),
      title: `${pick(DESCRIPTORS, rnd())} ${pick(COLOR_WORDS, rnd())} ${categoryLabel.replace(/^All\s/, "")}`,
      category: slug,
      categoryLabel,
      images,
      rating: Math.round((3.4 + rnd() * 1.6) * 10) / 10,
      reviews: 40 + Math.floor(rnd() * 3400),
      colors,
      sizes,
      price,
      originalPrice,
      discount,
      badge: pick(BADGES, rnd()),
      offer: pick(OFFERS, rnd()),
      inStock: rnd() > 0.12,
      createdAt: Date.now() - Math.floor(rnd() * 120) * 86400000,
      popularity: Math.round(rnd() * 1000),
    });
  }

  return out;
}

export type SortKey = "popularity" | "new" | "price-desc" | "price-asc" | "discount";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "popularity", label: "Popularity" },
  { key: "new", label: "New Arrival" },
  { key: "price-desc", label: "Price : High to Low" },
  { key: "price-asc", label: "Price : Low to High" },
  { key: "discount", label: "Discount" },
];

export function sortProducts(items: Product[], key: SortKey) {
  const copy = [...items];
  switch (key) {
    case "new":
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "discount":
      return copy.sort((a, b) => b.discount - a.discount);
    default:
      return copy.sort((a, b) => b.popularity - a.popularity);
  }
}

export type Filters = {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceMax: number;
  rating: number;
  discount: number;
  inStockOnly: boolean;
};

export const PRICE_CEILING = 5000;

export const emptyFilters: Filters = {
  brands: [],
  sizes: [],
  colors: [],
  priceMax: PRICE_CEILING,
  rating: 0,
  discount: 0,
  inStockOnly: false,
};

export function countActiveFilters(f: Filters) {
  return (
    f.brands.length +
    f.sizes.length +
    f.colors.length +
    (f.priceMax < PRICE_CEILING ? 1 : 0) +
    (f.rating > 0 ? 1 : 0) +
    (f.discount > 0 ? 1 : 0) +
    (f.inStockOnly ? 1 : 0)
  );
}

export function filterProducts(items: Product[], f: Filters, query = "") {
  const q = query.trim().toLowerCase();
  return items.filter((p) => {
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.sizes.length && !f.sizes.some((s) => p.sizes.includes(s))) return false;
    if (f.colors.length && !f.colors.some((c) => p.colors.includes(c))) return false;
    if (p.price > f.priceMax) return false;
    if (f.rating && p.rating < f.rating) return false;
    if (f.discount && p.discount < f.discount) return false;
    if (f.inStockOnly && !p.inStock) return false;
    if (q) {
      const hay = `${p.brand} ${p.title} ${p.categoryLabel}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
