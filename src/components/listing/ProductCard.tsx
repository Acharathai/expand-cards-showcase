import { Heart, Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { formatPrice, type Product } from "@/data/products";

type Props = {
  product: Product;
  index: number;
  wishlisted: boolean;
  onToggleWishlist: (id: string) => void;
};

export function ProductCard({ product, index, wishlisted, onToggleWishlist }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [selectedColor, setSelectedColor] = useState(0);
  const [pop, setPop] = useState(false);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  const visibleColors = product.colors.slice(0, 3);
  const extraColors = product.colors.length - visibleColors.length;

  return (
    <article
      className="reveal flex h-full flex-col"
      style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
    >
      <div className="relative overflow-hidden rounded-[18px] bg-muted">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {product.images.map((src, i) => (
            <div key={i} className="relative w-full shrink-0 basis-full snap-center">
              <span className="block aspect-[3/4] w-full">
                <img
                  src={src}
                  alt={`${product.title} view ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={768}
                  height={1024}
                  onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
                  className="h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: loaded[i] ? 1 : 0 }}
                />
              </span>
              {!loaded[i] && <span className="shimmer absolute inset-0" />}
            </div>
          ))}
        </div>

        <Link
          to="/p/$productId"
          params={{ productId: product.id }}
          aria-label={`View ${product.title}`}
          className="absolute inset-0"
        />

        {product.badge && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full bg-background/92 px-2 py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.07em] text-foreground backdrop-blur">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => {
            onToggleWishlist(product.id);
            setPop(true);
            window.setTimeout(() => setPop(false), 320);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/85 backdrop-blur"
          style={{
            transform: pop ? "scale(1.18)" : "scale(1)",
            transition: "transform 300ms cubic-bezier(0.22,1.6,0.36,1)",
          }}
        >
          <Heart
            size={15.5}
            strokeWidth={2}
            className={wishlisted ? "text-primary" : "text-foreground"}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <span className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-background/92 px-2 py-[3px] backdrop-blur">
          <Star size={11} strokeWidth={0} className="text-chart-4" fill="currentColor" />
          <span className="text-[10.5px] font-semibold text-foreground">{product.rating}</span>
          <span className="text-[10.5px] font-medium text-muted-foreground">
            ·{" "}
            {product.reviews >= 1000
              ? `${(product.reviews / 1000).toFixed(1)}k`
              : product.reviews}
          </span>
        </span>

        <div className="absolute bottom-2 right-2 flex items-center rounded-full bg-background/92 p-1 backdrop-blur">
          {visibleColors.map((c, i) => (
            <button
              key={c + i}
              aria-label={`Select colour ${i + 1}`}
              onClick={() => setSelectedColor(i)}
              className="h-[15px] w-[15px] rounded-full transition-transform duration-200"
              style={{
                backgroundColor: c,
                marginLeft: i === 0 ? 0 : -5,
                zIndex: 3 - i,
                boxShadow:
                  selectedColor === i
                    ? "0 0 0 1.5px var(--color-background), 0 0 0 3px var(--color-foreground)"
                    : "0 0 0 1.5px var(--color-background)",
                transform: selectedColor === i ? "scale(1.1)" : "none",
              }}
            />
          ))}
          {extraColors > 0 && (
            <span className="pl-1.5 pr-0.5 text-[9.5px] font-semibold text-muted-foreground">
              +{extraColors}
            </span>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-[38px] flex justify-center gap-1">
            {product.images.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  height: 4,
                  width: i === active ? 10 : 4,
                  backgroundColor:
                    i === active ? "var(--color-foreground)" : "var(--color-border)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-0.5 pt-2.5">
        <p className="truncate text-[12.5px] font-semibold tracking-[-0.01em] text-foreground">
          {product.brand}
        </p>
        <p className="mt-0.5 line-clamp-2 min-h-[32px] text-[12px] font-normal leading-[16px] text-muted-foreground">
          {product.title}
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[14.5px] font-bold tracking-[-0.02em] text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="text-[11.5px] font-medium text-muted-foreground line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="text-[11.5px] font-semibold text-success">
            {product.discount}% OFF
          </span>
        </div>
        <div className="mt-1.5 flex min-h-[16px] items-center gap-1">
          {product.offer && (
            <>
              <Sparkles size={11} strokeWidth={2} className="shrink-0 text-primary" />
              <span className="truncate text-[10.5px] font-medium text-foreground/75">
                {product.offer}
              </span>
            </>
          )}
        </div>
        {!product.inStock && (
          <span className="mt-1 w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            Out of stock
          </span>
        )}
      </div>
    </article>
  );
}
