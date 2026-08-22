import { ChevronDown, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Category } from "@/data/categories";

function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <span className="absolute inset-0 block overflow-hidden">
      {!loaded && <span aria-hidden className="shimmer absolute inset-0 block" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}

type Props = {
  category: Category;
  open: boolean;
  onToggle: () => void;
  onSelect: (route: string, title: string) => void;
};

export function CategorySection({ category, open, onToggle, onSelect }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!open) return;
    const t = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 280);
    return () => window.clearTimeout(t);
  }, [open]);

  const preview = category.previews ?? category.items.slice(0, 3).map((i) => i.image);
  const imageOnly = !!category.imageOnly;
  const square = !!category.squareItems;
  const disabled = !!category.disabled;
  const isAction = !!category.action;
  const columns = category.columns ?? 3;

  return (
    <section ref={sectionRef} className="scroll-mt-[104px]">
      <button
        type="button"
        onClick={disabled ? undefined : onToggle}
        aria-expanded={!disabled && !isAction ? open : undefined}
        aria-disabled={disabled || undefined}
        className={`block w-full text-left ${disabled ? "cursor-default" : "press"}`}
      >
        <div
          className="relative flex items-center justify-between overflow-hidden rounded-[18px] px-4.5 py-4 shadow-[var(--shadow-card)] transition-[border-radius,background-color,transform] duration-300"
          style={{
            backgroundColor: category.tint,
            borderBottomLeftRadius: open ? 6 : 18,
            borderBottomRightRadius: open ? 6 : 18,
          }}
        >
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="whitespace-nowrap text-[17px] font-semibold leading-tight tracking-[-0.02em] text-foreground">
              {category.title}
            </h2>
            {disabled ? (
              <span className="rounded-full bg-foreground/8 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-foreground/50">
                Soon
              </span>
            ) : isAction ? (
              <PenLine size={15} strokeWidth={2.1} className="shrink-0 text-foreground/60" />
            ) : (
              <ChevronDown
                size={16}
                strokeWidth={2.2}
                className="shrink-0 text-foreground/60 transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            )}
          </div>

          <div
            className="flex shrink-0 items-center pl-3 transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "translateX(10px) scale(0.85)" : "none",
            }}
          >
            {preview.map((src, i) => (
              <span
                key={src}
                className="relative h-9 w-9 overflow-hidden rounded-full bg-card ring-2 ring-card"
                style={{ marginLeft: i === 0 ? 0 : -10 }}
              >
                <FadeImage src={src} alt="" />
              </span>
            ))}
          </div>
        </div>
      </button>

      {!disabled && !isAction && (
        <div
          className="overflow-hidden transition-[height,opacity] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ height: open ? height : 0, opacity: open ? 1 : 0 }}
          aria-hidden={!open}
        >
          <div ref={panelRef} className="pt-3">
            <div className="mb-3 flex items-center gap-3 px-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-px flex-1 bg-border" />
            </div>

            <ul
              className="grid gap-2.5"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {category.items.map((item, i) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.route, item.title)}
                    aria-label={item.title}
                    className={`press block w-full overflow-hidden text-left ${
                      square
                        ? "rounded-none"
                        : "rounded-[14px] border border-border bg-card shadow-[var(--shadow-card)]"
                    }`}
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
                      transition:
                        "opacity 340ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: open ? `${100 + i * 36}ms` : "0ms",
                    }}
                  >
                    <span
                      className={`relative block overflow-hidden ${square ? "" : "bg-muted"}`}
                      style={{ aspectRatio: category.itemAspect ?? "1 / 1" }}
                    >
                      <FadeImage src={item.image} alt={item.title} />
                    </span>
                    {!imageOnly && (
                      <span className="block px-2.5 py-2 text-[12px] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                        {item.title}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
