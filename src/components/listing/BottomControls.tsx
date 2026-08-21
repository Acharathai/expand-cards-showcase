import { ArrowDownUp, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  sortLabel: string;
  filterCount: number;
  onSort: () => void;
  onFilter: () => void;
};

export function BottomControls({ sortLabel, filterCount, onSort, onFilter }: Props) {
  const [bump, setBump] = useState(false);
  useEffect(() => {
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 300);
    return () => window.clearTimeout(t);
  }, [filterCount]);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[520px] border-t border-border bg-background/95 backdrop-blur-xl"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)" }}
    >
      <div className="grid grid-cols-2 items-stretch">
        <button
          onClick={onSort}
          className="press flex items-center justify-center gap-2.5 py-3"
        >
          <ArrowDownUp size={17} strokeWidth={1.9} className="text-foreground" />
          <span className="text-left">
            <span className="block text-[13.5px] font-semibold leading-tight tracking-[-0.01em] text-foreground">
              Sort
            </span>
            <span className="block text-[11px] font-medium leading-tight text-muted-foreground">
              {sortLabel}
            </span>
          </span>
        </button>

        <button
          onClick={onFilter}
          className="press flex items-center justify-center gap-2.5 border-l border-border py-3"
        >
          <SlidersHorizontal size={17} strokeWidth={1.9} className="text-foreground" />
          <span className="text-left">
            <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-tight tracking-[-0.01em] text-foreground">
              Filter
              {filterCount > 0 && (
                <span
                  className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground transition-transform duration-300"
                  style={{ transform: bump ? "scale(1.25)" : "scale(1)" }}
                >
                  {filterCount}
                </span>
              )}
            </span>
            <span className="block text-[11px] font-medium leading-tight text-muted-foreground">
              {filterCount > 0 ? `${filterCount} applied` : "Brand, price, size"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
