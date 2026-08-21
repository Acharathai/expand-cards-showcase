import { Check, ChevronDown, Star } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BottomSheet } from "./BottomSheet";
import {
  BRANDS,
  COLOR_OPTIONS,
  PRICE_CEILING,
  SIZES,
  emptyFilters,
  formatPrice,
  type Filters,
} from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
  value: Filters;
  onApply: (f: Filters) => void;
  resultCount: (f: Filters) => number;
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

function Row({
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
      className="press flex w-full items-center gap-3 py-2.5 text-left"
    >
      <span
        className="grid h-[21px] w-[21px] shrink-0 place-items-center rounded-[7px] border transition-all duration-200"
        style={{
          borderColor: selected ? "var(--color-primary)" : "var(--color-border)",
          backgroundColor: selected ? "var(--color-primary)" : "transparent",
        }}
      >
        <Check
          size={13}
          strokeWidth={3}
          className="text-primary-foreground transition-transform duration-200"
          style={{ transform: selected ? "scale(1)" : "scale(0.4)", opacity: selected ? 1 : 0 }}
        />
      </span>
      <span className="text-[13.5px] font-medium text-foreground">{label}</span>
    </button>
  );
}

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

const PRICE_PRESETS = [499, 999, 1999, PRICE_CEILING];
const DISCOUNTS = [10, 20, 30, 50];

export function FilterSheet({ open, onClose, value, onApply, resultCount }: Props) {
  const [draft, setDraft] = useState<Filters>(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const count = resultCount(draft);

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
            Show {count} {count === 1 ? "Product" : "Products"}
          </button>
        </div>
      }
    >
      <Group
        title="Brand"
        summary={draft.brands.length ? `${draft.brands.length} selected` : undefined}
        defaultOpen
      >
        <div className="flex flex-col">
          {BRANDS.map((b) => (
            <Row
              key={b}
              label={b}
              selected={draft.brands.includes(b)}
              onClick={() => setDraft((d) => ({ ...d, brands: toggle(d.brands, b) }))}
            />
          ))}
        </div>
      </Group>

      <Group
        title="Price"
        summary={
          draft.priceMax < PRICE_CEILING ? `Up to ${formatPrice(draft.priceMax)}` : undefined
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[12px] font-medium text-muted-foreground">
            <span>{formatPrice(0)}</span>
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
            className="h-1.5 w-full appearance-none rounded-full bg-muted accent-primary"
            style={{
              background: `linear-gradient(to right, var(--color-foreground) ${
                ((draft.priceMax - 299) / (PRICE_CEILING - 299)) * 100
              }%, var(--color-muted) 0%)`,
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

      <Group title="Size" summary={draft.sizes.join(", ") || undefined}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={draft.sizes.includes(s)}
              onClick={() => setDraft((d) => ({ ...d, sizes: toggle(d.sizes, s) }))}
            />
          ))}
        </div>
      </Group>

      <Group
        title="Colour"
        summary={draft.colors.length ? `${draft.colors.length} selected` : undefined}
      >
        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map((c) => {
            const selected = draft.colors.includes(c.hex);
            return (
              <button
                key={c.hex}
                aria-label={c.name}
                aria-pressed={selected}
                onClick={() => setDraft((d) => ({ ...d, colors: toggle(d.colors, c.hex) }))}
                className="press grid h-9 w-9 place-items-center rounded-full transition-transform duration-200"
                style={{
                  backgroundColor: c.hex,
                  boxShadow: selected
                    ? "0 0 0 2px var(--color-background), 0 0 0 4px var(--color-foreground)"
                    : "inset 0 0 0 1px var(--color-border)",
                  transform: selected ? "scale(1.06)" : "none",
                }}
              />
            );
          })}
        </div>
      </Group>

      <Group title="Rating" summary={draft.rating ? `${draft.rating}★ & above` : undefined}>
        <div className="flex flex-wrap gap-2">
          {[4, 3].map((r) => (
            <button
              key={r}
              onClick={() => setDraft((d) => ({ ...d, rating: d.rating === r ? 0 : r }))}
              aria-pressed={draft.rating === r}
              className="press flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-200"
              style={{
                borderColor:
                  draft.rating === r ? "var(--color-foreground)" : "var(--color-border)",
                backgroundColor: draft.rating === r ? "var(--color-foreground)" : "transparent",
                color: draft.rating === r ? "var(--color-background)" : "var(--color-foreground)",
              }}
            >
              <Star size={12} strokeWidth={0} fill="currentColor" />
              {r}★ & above
            </button>
          ))}
        </div>
      </Group>

      <Group title="Discount" summary={draft.discount ? `${draft.discount}%+` : undefined}>
        <div className="flex flex-wrap gap-2">
          {DISCOUNTS.map((d) => (
            <Chip
              key={d}
              label={`${d}%+`}
              selected={draft.discount === d}
              onClick={() =>
                setDraft((prev) => ({ ...prev, discount: prev.discount === d ? 0 : d }))
              }
            />
          ))}
        </div>
      </Group>

      <Group title="Availability" defaultOpen>
        <Row
          label="In stock only"
          selected={draft.inStockOnly}
          onClick={() => setDraft((d) => ({ ...d, inStockOnly: !d.inStockOnly }))}
        />
      </Group>
    </BottomSheet>
  );
}
