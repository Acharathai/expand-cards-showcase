import { ChevronDown } from "lucide-react";
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
    }, 260);
    return () => window.clearTimeout(t);
  }, [open]);

  const preview = category.previews ?? category.items.slice(0, 3).map((i) => i.image);
  const imageOnly = !!category.imageOnly;
  const square = !!category.squareItems;

  return (
    <section ref={sectionRef} className="scroll-mt-20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="press block w-full text-left"
      >
        <div
          className="relative flex items-center justify-between overflow-hidden rounded-[22px] px-6 py-6 shadow-[var(--shadow-card)] transition-[border-radius,background-color] duration-300"
          style={{
            backgroundColor: category.tint,
            borderBottomLeftRadius: open ? 6 : 22,
            borderBottomRightRadius: open ? 6 : 22,
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <h2 className="whitespace-nowrap text-[20px] font-semibold leading-tight tracking-[-0.02em] text-foreground">
              {category.title}
            </h2>
            <ChevronDown
              size={18}
              strokeWidth={2.2}
              className="shrink-0 text-foreground/60 transition-transform duration-[420ms]"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>

          <div
            className="flex shrink-0 items-center pl-3 transition-all duration-[420ms]"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "translateX(12px) scale(0.9)" : "none",
            }}
          >
            {preview.map((src, i) => (
              <span
                key={src}
                className="h-12 w-12 overflow-hidden rounded-full bg-card ring-2 ring-card"
                style={{ marginLeft: i === 0 ? 0 : -12 }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-full w-full object-cover"
                />
              </span>
            ))}
          </div>
        </div>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-[440ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ height: open ? height : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div ref={panelRef} className="pt-4">
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {category.items.length} collections
            </span>
          </div>

          <ul className="grid grid-cols-3 gap-2.5">
            {category.items.map((item, i) => (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => onSelect(item.route, item.title)}
                  aria-label={item.title}
                  className={`press block w-full overflow-hidden text-left ${
                    square
                      ? "rounded-none"
                      : "rounded-[16px] border border-border bg-card shadow-[var(--shadow-card)]"
                  }`}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(14px)",
                    transition:
                      "opacity 320ms ease, transform 380ms cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: open ? `${120 + i * 40}ms` : "0ms",
                  }}
                >
                  <span
                    className={`block overflow-hidden ${square ? "" : "bg-muted"}`}
                    style={{ aspectRatio: category.itemAspect ?? "1 / 1" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  {!imageOnly && (
                    <span className="block px-2.5 py-2.5 text-[12px] font-medium leading-snug tracking-[-0.01em] text-foreground">
                      {item.title}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
