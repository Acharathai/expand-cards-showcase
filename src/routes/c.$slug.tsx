import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ListingHeader } from "@/components/listing/ListingHeader";
import { PromoStrip } from "@/components/listing/PromoStrip";
import { ProductCard } from "@/components/listing/ProductCard";
import { ProductSkeletonGrid } from "@/components/listing/ProductSkeleton";
import { BottomControls } from "@/components/listing/BottomControls";
import { SortSheet } from "@/components/listing/SortSheet";
import { FilterSheet, type FilterMode } from "@/components/listing/FilterSheet";
import { SearchOverlay, type SearchResultItem } from "@/components/listing/SearchOverlay";
import { EmptyState } from "@/components/listing/EmptyState";
import { getCatalogEntry, getProducts, siblingLinks, slugFromRoute } from "@/data/catalog";
import {
  GENRE_TITLES,
  PLATFORM_TITLES,
  SORT_OPTIONS,
  countActiveFilters,
  emptyFilters,
  filterProducts,
  formatPrice,
  sortProducts,
  type Filters,
  type SortKey,
} from "@/data/products";

const PAGE_SIZE = 8;

export const Route = createFileRoute("/c/$slug")({
  loader: ({ params }) => {
    const entry = getCatalogEntry(params.slug);
    if (!entry) throw notFound();
    return { title: entry.title, parentTitle: entry.parentTitle, parentId: entry.parentId };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Storyfi" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — ${loaderData.parentTitle} | Storyfi`;
    const description = `Browse ${loaderData.title} stories on Storyfi. Filter by genre, platform, language and price, sort by what matters and enjoy a fast mobile-first story grid.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ListingPage,
});

function ListingPage() {
  const { slug } = Route.useParams();
  const { title, parentId } = Route.useLoaderData();
  const navigate = useNavigate();

  const all = useMemo(() => getProducts(slug), [slug]);

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  const gridTop = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setFilters(emptyFilters);
    setQuery("");
    const t = window.setTimeout(() => setLoading(false), 550);
    return () => window.clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = useMemo(() => {
    const filtered = filterProducts(all, filters, query);
    return sortProducts(filtered, sort);
  }, [all, filters, query, sort]);

  const shown = visible.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < visible.length;

  useEffect(() => {
    if (!hasMore || loading) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (items) => {
        if (items[0]?.isIntersecting) setPage((p) => p + 1);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading, shown.length]);

  const resultCount = useCallback(
    (f: Filters) => filterProducts(all, f, query).length,
    [all, query],
  );

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const applyFilters = (f: Filters) => {
    setFilters(f);
    setPage(1);
    window.requestAnimationFrame(() =>
      gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    setQuery("");
    setPage(1);
  };

  const commitQuery = useCallback((q: string) => {
    setQuery(q);
    setPage(1);
    const trimmed = q.trim();
    if (trimmed.length > 1) {
      setRecent((r) => [trimmed, ...r.filter((x) => x !== trimmed)].slice(0, 5));
    }
  }, []);

  const filterCount = countActiveFilters(filters);
  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "Price : Low to High";
  const siblings = siblingLinks(parentId).filter((s) => slugFromRoute(s.route) !== slug);
  const filterMode: FilterMode =
    parentId === "genres" ? "genre" : parentId === "platform" ? "platform" : "language";

  const searchResults = useMemo<SearchResultItem[]>(
    () =>
      filterProducts(all, emptyFilters, query).map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: `${p.genre} • ${p.platform} • ${p.language}`,
        image: p.images[0],
        right: formatPrice(p.price),
        onSelect: () => navigate({ to: "/p/$productId", params: { productId: p.id } }),
      })),
    [all, query, navigate],
  );

  const suggestions = useMemo(
    () => [title, ...GENRE_TITLES.slice(0, 3), ...PLATFORM_TITLES.slice(0, 3)],
    [title],
  );

  return (
    <div className="mx-auto min-h-[100dvh] w-full max-w-[520px] overflow-x-hidden bg-background">
      <ListingHeader
        title={title}
        count={visible.length}
        wishlistCount={wishlist.length}
        onSearch={() => setSearchOpen(true)}
        compact={compact}
      />

      <PromoStrip promo={{ text: "Free shipping on orders above ₹399" }} />

      <main
        className="px-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 108px)" }}
      >
        <div ref={gridTop} className="scroll-mt-24 pb-3 pt-1">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="min-w-0 truncate text-[26px] font-bold leading-tight tracking-[-0.035em] text-foreground">
              {title}
            </h2>
            <span className="shrink-0 text-[12px] font-medium text-muted-foreground">
              {visible.length} Stories
            </span>
          </div>
          {query && (
            <p className="mt-1 text-[12px] font-medium text-muted-foreground">
              Matching “{query}”
            </p>
          )}
        </div>

        {siblings.length > 0 && (
          <div className="-mx-3 mb-4 flex gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {siblings.slice(0, 8).map((s) => (
              <a
                key={s.route}
                href={`/c/${slugFromRoute(s.route)}`}
                className="press shrink-0 rounded-full border border-border px-3.5 py-1.5 text-[12px] font-medium text-foreground"
              >
                {s.title}
              </a>
            ))}
          </div>
        )}

        {loading ? (
          <ProductSkeletonGrid count={6} />
        ) : shown.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <>
            <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-6">
              {shown.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i % PAGE_SIZE}
                  wishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>

            <div ref={sentinel} className="h-8" />
            {hasMore ? (
              <div className="flex justify-center py-4">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
              </div>
            ) : (
              <p className="py-6 text-center text-[11.5px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                End of collection
              </p>
            )}
          </>
        )}
      </main>

      <BottomControls
        sortLabel={sortLabel}
        filterCount={filterCount}
        onSort={() => setSortOpen(true)}
        onFilter={() => setFilterOpen(true)}
      />

      <SortSheet
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        value={sort}
        onChange={(k) => {
          setSort(k);
          setPage(1);
        }}
      />

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filters}
        onApply={applyFilters}
        resultCount={resultCount}
        mode={filterMode}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={query}
        onQueryChange={commitQuery}
        suggestions={suggestions}
        recent={recent}
        results={searchResults}
      />
    </div>
  );
}
