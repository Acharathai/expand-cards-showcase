import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { TopBar } from "@/components/shop/TopBar";
import { BottomDock } from "@/components/shop/BottomDock";
import { CategorySection } from "@/components/shop/CategorySection";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Categories — Atelier Shop" },
      {
        name: "description",
        content:
          "Browse Atelier's shop categories: topwear, bottomwear, footwear, accessories and trending edits, built for Telegram Mini Apps.",
      },
      { property: "og:title", content: "Categories — Atelier Shop" },
      {
        property: "og:description",
        content:
          "Tap a category to expand its collections and browse subcategories in a fast mobile shopping experience.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [openId, setOpenId] = useState<string | null>("topwear");

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background">
      <TopBar />

      <main
        className="px-5"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 104px)" }}
      >
        <h1 className="pb-6 pt-2 text-[38px] font-bold leading-none tracking-[-0.035em] text-foreground">
          Categories
        </h1>

        <div className="flex flex-col gap-3.5">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              open={openId === category.id}
              onToggle={() =>
                setOpenId((prev) => (prev === category.id ? null : category.id))
              }
              onSelect={(_route, title) => toast(`Opening ${title}`)}
            />
          ))}
        </div>
      </main>

      <BottomDock active="categories" />
      <Toaster position="top-center" />
    </div>
  );
}
