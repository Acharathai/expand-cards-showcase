import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TopBar } from "@/components/shop/TopBar";
import { BottomDock } from "@/components/shop/BottomDock";
import { CategorySection } from "@/components/shop/CategorySection";
import { RequestStorySheet } from "@/components/shop/RequestStorySheet";
import { SearchOverlay, type SearchResultItem } from "@/components/listing/SearchOverlay";
import { categories } from "@/data/categories";
import { getCatalogEntry, slugFromRoute } from "@/data/catalog";
import { GENRE_TITLES, PLATFORM_TITLES } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Storyfi — Audio Stories, Genres & Platforms" },
      {
        name: "description",
        content:
          "Browse audio stories by platform, genre and language — Pocket FM, Kuku FM, Kuku TV and more — in a fast Telegram Mini App experience.",
      },
      { property: "og:title", content: "Storyfi — Audio Stories, Genres & Platforms" },
      {
        property: "og:description",
        content:
          "Tap a category to explore story platforms, genres and languages, or request a story of your own.",
      },
    ],
  }),
  component: CategoriesPage,
});

const SUGGESTIONS = [
  GENRE_TITLES[1]!, // Romance
  GENRE_TITLES[0]!, // Horror
  PLATFORM_TITLES[0]!, // Pocket FM
  GENRE_TITLES[2]!, // Fantasy
  PLATFORM_TITLES[2]!, // Kuku TV
  GENRE_TITLES[10]!, // Mystery
];

function CategoriesPage() {
  const [openId, setOpenId] = useState<string | null>("platform");
  const [requestOpen, setRequestOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();

  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResultItem[] = [];
    for (const category of categories) {
      if (category.disabled || category.action) continue;
      for (const item of category.items) {
        if (!item.title.toLowerCase().includes(q)) continue;
        const entry = getCatalogEntry(slugFromRoute(item.route));
        out.push({
          id: item.route,
          title: item.title,
          subtitle: `${category.title} • ${entry?.count ?? 0} stories`,
          image: item.image,
          onSelect: () =>
            navigate({ to: "/c/$slug", params: { slug: slugFromRoute(item.route) } }),
        });
      }
    }
    return out;
  }, [query, navigate]);

  const commitQuery = (q: string) => {
    setQuery(q);
    const trimmed = q.trim();
    if (trimmed.length > 1) {
      setRecent((r) => [trimmed, ...r.filter((x) => x !== trimmed)].slice(0, 5));
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background">
      <TopBar onSearch={() => setSearchOpen(true)} />

      <main
        className="px-4 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 104px)" }}
      >
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              open={openId === category.id}
              onToggle={() => {
                if (category.action === "request-story") {
                  setRequestOpen(true);
                  return;
                }
                setOpenId((prev) => (prev === category.id ? null : category.id));
              }}
              onSelect={(route) =>
                navigate({ to: "/c/$slug", params: { slug: slugFromRoute(route) } })
              }
            />
          ))}
        </div>
      </main>

      <BottomDock active="categories" />
      <RequestStorySheet open={requestOpen} onClose={() => setRequestOpen(false)} />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={query}
        onQueryChange={commitQuery}
        suggestions={SUGGESTIONS}
        recent={recent}
        results={results}
      />
      <Toaster position="top-center" />
    </div>
  );
}
