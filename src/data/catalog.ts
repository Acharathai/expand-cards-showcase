import { categories, type SubCategory } from "./categories";
import { generateProducts, type Product } from "./products";

export function slugFromRoute(route: string) {
  return route.replace(/^\//, "").replace(/\//g, "-");
}

export type CatalogEntry = {
  slug: string;
  title: string;
  parentId: string;
  parentTitle: string;
  item: SubCategory;
  count: number;
};

const entries = new Map<string, CatalogEntry>();

for (const category of categories) {
  category.items.forEach((item, i) => {
    const slug = slugFromRoute(item.route);
    entries.set(slug, {
      slug,
      title: item.title,
      parentId: category.id,
      parentTitle: category.title,
      item,
      count: 18 + ((i * 7 + category.title.length * 5) % 45),
    });
  });
}

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  return entries.get(slug);
}

const cache = new Map<string, Product[]>();

/** Cached, deterministic product list for a category slug. */
export function getProducts(slug: string): Product[] {
  const cached = cache.get(slug);
  if (cached) return cached;
  const entry = getCatalogEntry(slug);
  const products = generateProducts(slug, entry?.title ?? "Products", entry?.count ?? 24);
  cache.set(slug, products);
  return products;
}

export function findProduct(productId: string): Product | undefined {
  const slug = productId.replace(/-\d+$/, "");
  return getProducts(slug).find((p) => p.id === productId);
}

export const siblingLinks = (parentId: string) =>
  categories.find((c) => c.id === parentId)?.items ?? [];
