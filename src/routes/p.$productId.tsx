import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { findProduct } from "@/data/catalog";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/p/$productId")({
  loader: ({ params }) => {
    const product = findProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Atelier Shop" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.title} — ${product.brand} | Atelier Shop`;
    const description = `${product.title} by ${product.brand}. ${formatPrice(product.price)} (${product.discount}% off). ${product.rating}★ from ${product.reviews} reviews.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto min-h-[100dvh] w-full max-w-[520px] overflow-x-hidden bg-background">
      <header
        className="sticky top-0 z-30 flex items-center justify-between bg-background/90 px-3 pb-2 backdrop-blur-xl"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)" }}
      >
        <Link
          to="/c/$slug"
          params={{ slug: product.category }}
          aria-label="Back to listing"
          className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
        </Link>
        <p className="truncate px-2 text-[14px] font-semibold text-foreground">{product.brand}</p>
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label="Save to wishlist"
          className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <Heart size={20} strokeWidth={1.9} fill={saved ? "currentColor" : "none"} className={saved ? "text-primary" : ""} />
        </button>
      </header>

      <main
        className="px-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)" }}
      >
        <div className="reveal flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {product.images.map((src, i) => (
            <span
              key={i}
              className="aspect-[3/4] w-[86%] shrink-0 snap-center overflow-hidden rounded-[20px] bg-muted"
            >
              <img
                src={src}
                alt={`${product.title} view ${i + 1}`}
                width={768}
                height={1024}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </span>
          ))}
        </div>

        <div className="reveal pt-4" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
              <Star size={11} strokeWidth={0} fill="currentColor" className="text-chart-4" />
              <span className="text-[11px] font-semibold text-foreground">{product.rating}</span>
            </span>
            <span className="text-[11.5px] font-medium text-muted-foreground">
              {product.reviews} reviews
            </span>
            {product.badge && (
              <span className="rounded-full bg-muted px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.07em] text-foreground">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.03em] text-foreground">
            {product.title}
          </h1>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[20px] font-bold tracking-[-0.02em] text-foreground">
              {formatPrice(product.price)}
            </span>
            <span className="text-[13px] font-medium text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="text-[13px] font-semibold text-success">
              {product.discount}% OFF
            </span>
          </div>

          {product.offer && (
            <p className="mt-2 flex items-center gap-1.5 text-[12.5px] font-medium text-foreground/80">
              <Sparkles size={13} strokeWidth={2} className="text-primary" />
              {product.offer}
            </p>
          )}

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Colour
          </p>
          <div className="mt-2.5 flex gap-3">
            {product.colors.map((c, i) => (
              <button
                key={c + i}
                aria-label={`Colour ${i + 1}`}
                onClick={() => setColor(i)}
                className="press h-9 w-9 rounded-full transition-transform duration-200"
                style={{
                  backgroundColor: c,
                  boxShadow:
                    color === i
                      ? "0 0 0 2px var(--color-background), 0 0 0 4px var(--color-foreground)"
                      : "inset 0 0 0 1px var(--color-border)",
                  transform: color === i ? "scale(1.06)" : "none",
                }}
              />
            ))}
          </div>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Size
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="press rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors duration-200"
                style={{
                  borderColor: size === s ? "var(--color-foreground)" : "var(--color-border)",
                  backgroundColor: size === s ? "var(--color-foreground)" : "transparent",
                  color: size === s ? "var(--color-background)" : "var(--color-foreground)",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
            Cut from premium fabric with a considered, relaxed silhouette. Pre-washed for
            softness, finished with reinforced seams and designed to hold shape wash after wash.
          </p>
        </div>
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[520px] border-t border-border bg-background/95 px-3 pt-3 backdrop-blur-xl"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <button className="press w-full rounded-full bg-foreground py-3.5 text-[14.5px] font-semibold text-background">
          {product.inStock ? "Add to Bag" : "Notify Me"}
        </button>
      </div>
    </div>
  );
}
