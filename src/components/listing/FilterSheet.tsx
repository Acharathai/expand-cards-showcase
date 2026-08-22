import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BottomSheet } from "./BottomSheet";
import {
  GENRE_TITLES,
  LANGUAGES,
  PLATFORM_TITLES,
  PRICE_CEILING,
  emptyFilters,
  formatPrice,
  type Filters,
} from "@/data/products";

export type FilterMode = "platform" | "genre" | "language";

type Props = {
  open: boolean;
  onClose: () => void;
  value: Filters;
  onApply: (f: Filters) => void;
  resultCount: (f: Filters) => number;
  mode: FilterMode;
};

function Group({
  title,
  summary,
  children,
  defaultOpen,
}: {
  title: string;
  summary?: string | undefined;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <section className="border-b border-border py-1">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
      >
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
            {title}
          </span>
          {summary && (
            <span className="truncate text-[11.5px] font-medium text-muted-foreground">
              {summary}
            </span>
          )}
        </span>
        <ChevronDown
          size={17}
          strokeWidth={2}
          className="shrink-0 text-muted-foreground transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="press rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-200"
      style={{
        borderColor: selected ? "var(--color-foreground)" : "var(--color-border)",
        backgroundColor: selected ? "var(--color-foreground)" : "transparent",
        color: selected ? "var(--color-background)" : "var(--color-foreground)",
      }}
    >
      {label}
    </button>
  );
}

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

const PRICE_PRESETS = [499, 999, 1999, PRICE_CEILING];

export function FilterSheet({ open, onClose, value, onApply, resultCount, mode }: Props) {
  const [draft, setDraft] = useState<Filters>(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const count = resultCount(draft);

  const showGenre = mode !== "genre";
  const showPlatform = mode !== "platform";
  const showPrice = mode === "genre";

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Filters"
      full
      footer={
        <div className="flex gap-3">
          <button
            onClick={() => setDraft(emptyFilters)}
            className="press flex-1 rounded-full border border-border py-3.5 text-[14px] font-semibold text-foreground"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            className="press flex-[1.4] rounded-full bg-foreground py-3.5 text-[14px] font-semibold text-background"
          >
            Show {count} {count === 1 ? "Story" : "Stories"}
          </button>
        </div>
      }
    >
      {showPrice && (
        <Group
          title="Price"
          defaultOpen
          summary={
            draft.priceMax < PRICE_CEILING ? `Up to ${formatPrice(draft.priceMax)}` : undefined
          }
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-[12px] font-medium text-muted-foreground">
              <span>{formatPrice(299)}</span>
              <span className="font-semibold text-foreground">
                Up to {formatPrice(draft.priceMax)}
              </span>
            </div>
            <input
              type="range"
              min={299}
              max={PRICE_CEILING}
              step={100}
              value={draft.priceMax}
              onChange={(e) => setDraft((d) => ({ ...d, priceMax: Number(e.target.value) }))}
              aria-label="Maximum price"
              className="h-1.5 w-full appearance-none rounded-full accent-primary"
              style={{
                background: `linear-gradient(to right, var(--color-foreground) ${
                  ((draft.priceMax - 299) / (PRICE_CEILING - 299)) * 100
                }%, var(--color-muted) ${
                  ((draft.priceMax - 299) / (PRICE_CEILING - 299)) * 100
                }%)`,
              }}
            />
            <div className="flex flex-wrap gap-2">
              {PRICE_PRESETS.map((p) => (
                <Chip
                  key={p}
                  label={p === PRICE_CEILING ? "All prices" : `Under ${formatPrice(p)}`}
                  selected={draft.priceMax === p}
                  onClick={() => setDraft((d) => ({ ...d, priceMax: p }))}
                />
              ))}
            </div>
          </div>
        </Group>
      )}

      {showGenre && (
        <Group
          title="Genre"
          defaultOpen={!showPrice}
          summary={draft.genres.length ? `${draft.genres.length} selected` : undefined}
        >
          <div className="flex flex-wrap gap-2">
            {GENRE_TITLES.map((g) => (
              <Chip
                key={g}
                label={g}
                selected={draft.genres.includes(g)}
                onClick={() => setDraft((d) => ({ ...d, genres: toggle(d.genres, g) }))}
              />
            ))}
          </div>
        </Group>
      )}

      {showPlatform && (
        <Group
          title="Platform"
          defaultOpen={mode === "genre"}
          summary={draft.platforms.length ? `${draft.platforms.length} selected` : undefined}
        >
          <div className="flex flex-wrap gap-2">
            {PLATFORM_TITLES.map((p) => (
              <Chip
                key={p}
                label={p}
                selected={draft.platforms.includes(p)}
                onClick={() => setDraft((d) => ({ ...d, platforms: toggle(d.platforms, p) }))}
              />
            ))}
          </div>
        </Group>
      )}

      <Group
        title="Language"
        summary={draft.languages.length ? draft.languages.join(", ") : undefined}
      >
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <Chip
              key={l}
              label={l}
              selected={draft.languages.includes(l)}
              onClick={() => setDraft((d) => ({ ...d, languages: toggle(d.languages, l) }))}
            />
          ))}
        </div>
      </Group>
    </BottomSheet>
  );
}
