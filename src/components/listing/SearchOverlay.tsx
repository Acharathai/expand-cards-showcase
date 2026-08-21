import { ArrowLeft, Clock, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  suggestions: string[];
  recent: string[];
  results: Product[];
};

export function SearchOverlay({
  open,
  onClose,
  query,
  onQueryChange,
  suggestions,
  recent,
  results,
}: Props) {
  const [local, setLocal] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setLocal(query);
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open, query]);

  // Debounced commit
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => onQueryChange(local), 220);
    return () => window.clearTimeout(t);
  }, [local, open, onQueryChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-[520px] flex-col bg-background">
      <div
        className="flex items-center gap-2 px-3 pb-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close search"
          className="press grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
        </button>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2.5">
          <Search size={17} strokeWidth={1.9} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Search products, brands…"
            className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
          />
          {local && (
            <button
              onClick={() => setLocal("")}
              aria-label="Clear search"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground/10 text-foreground"
            >
              <X size={13} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10">
        {!local && (
          <>
            <p className="pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Recent searches
            </p>
            {recent.length === 0 ? (
              <p className="py-2 text-[13px] text-muted-foreground">No recent searches yet.</p>
            ) : (
              recent.map((r) => (
                <button
                  key={r}
                  onClick={() => setLocal(r)}
                  className="press flex w-full items-center gap-3 border-b border-border py-3 text-left"
                >
                  <Clock size={15} strokeWidth={1.9} className="text-muted-foreground" />
                  <span className="text-[13.5px] font-medium text-foreground">{r}</span>
                </button>
              ))
            )}

            <p className="pb-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Popular right now
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setLocal(s)}
                  className="press rounded-full border border-border px-3.5 py-2 text-[12.5px] font-medium text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {local && (
          <>
            <p className="py-3 text-[12px] font-medium text-muted-foreground">
              {results.length} results for “{local}”
            </p>
            {results.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-[15px] font-semibold text-foreground">No matches</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Try a different brand, style or keyword.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col">
                {results.slice(0, 24).map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={onClose}
                      className="press flex w-full items-center gap-3 border-b border-border py-2.5 text-left"
                    >
                      <span className="h-14 w-11 shrink-0 overflow-hidden rounded-[10px] bg-muted">
                        <img
                          src={p.images[0]}
                          alt=""
                          loading="lazy"
                          width={768}
                          height={1024}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold text-foreground">
                          {p.brand}
                        </span>
                        <span className="block truncate text-[12px] text-muted-foreground">
                          {p.title}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-bold text-foreground">
                        {formatPrice(p.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
