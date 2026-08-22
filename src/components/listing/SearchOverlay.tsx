import { ArrowLeft, Clock, Search, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type SearchResultItem = {
  id: string;
  title: string;
  subtitle?: string | undefined;
  image?: string | undefined;
  right?: string | undefined;
  onSelect?: (() => void) | undefined;
};

type Props = {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  suggestions: string[];
  recent: string[];
  results: SearchResultItem[];
  placeholder?: string;
};

export function SearchOverlay({
  open,
  onClose,
  query,
  onQueryChange,
  suggestions,
  recent,
  results,
  placeholder = "Search stories, genres, platforms…",
}: Props) {
  const [local, setLocal] = useState(query);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setLocal(query);
      const raf = requestAnimationFrame(() => setShown(true));
      const t = window.setTimeout(() => inputRef.current?.focus(), 160);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(t);
      };
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), 340);
    return () => window.clearTimeout(t);
  }, [open, query]);

  // Debounced commit
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => onQueryChange(local), 220);
    return () => window.clearTimeout(t);
  }, [local, open, onQueryChange]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-[520px] flex-col bg-background"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) scale(1)" : "translateY(14px) scale(0.99)",
        transition:
          "opacity 300ms ease, transform 380ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
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
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-border bg-muted/70 px-4 py-3 shadow-[var(--shadow-card)]">
          <Search size={17} strokeWidth={2.1} className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-[14.5px] font-medium tracking-[-0.01em] text-foreground outline-none placeholder:text-muted-foreground"
          />
          {local && (
            <button
              onClick={() => setLocal("")}
              aria-label="Clear search"
              className="press grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground/10 text-foreground"
            >
              <X size={13} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10">
        {!local && (
          <>
            <p className="flex items-center gap-1.5 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <Clock size={12} strokeWidth={2.2} />
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
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <Clock size={14} strokeWidth={2} />
                  </span>
                  <span className="text-[13.5px] font-medium text-foreground">{r}</span>
                </button>
              ))
            )}

            <p className="flex items-center gap-1.5 pb-2.5 pt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              <TrendingUp size={12} strokeWidth={2.2} />
              Popular right now
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setLocal(s)}
                  className="press rounded-full border border-border bg-card px-3.5 py-2 text-[12.5px] font-semibold text-foreground shadow-[var(--shadow-card)]"
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
              {results.length} {results.length === 1 ? "result" : "results"} for “{local}”
            </p>
            {results.length === 0 ? (
              <div className="py-12 text-center">
                <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                  <Search size={20} strokeWidth={1.8} />
                </span>
                <p className="text-[15px] font-semibold text-foreground">No matches</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Try a different genre, platform or keyword.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col">
                {results.slice(0, 24).map((r) => (
                  <li key={r.id}>
                    <button
                      onClick={() => {
                        r.onSelect?.();
                        onClose();
                      }}
                      className="press flex w-full items-center gap-3 border-b border-border py-2.5 text-left"
                    >
                      {r.image && (
                        <span className="h-14 w-11 shrink-0 overflow-hidden rounded-[10px] bg-muted">
                          <img
                            src={r.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold tracking-[-0.01em] text-foreground">
                          {r.title}
                        </span>
                        {r.subtitle && (
                          <span className="block truncate text-[12px] text-muted-foreground">
                            {r.subtitle}
                          </span>
                        )}
                      </span>
                      {r.right && (
                        <span className="shrink-0 text-[13px] font-bold text-foreground">
                          {r.right}
                        </span>
                      )}
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
