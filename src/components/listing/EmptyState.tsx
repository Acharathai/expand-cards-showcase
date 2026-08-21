import { PackageSearch } from "lucide-react";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="reveal flex flex-col items-center px-6 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-muted">
        <PackageSearch size={26} strokeWidth={1.6} className="text-muted-foreground" />
      </span>
      <h2 className="mt-5 text-[17px] font-bold tracking-[-0.02em] text-foreground">
        No products found
      </h2>
      <p className="mt-1.5 max-w-[260px] text-[13px] leading-relaxed text-muted-foreground">
        Try changing or clearing your filters to see more of this collection.
      </p>
      <button
        onClick={onClear}
        className="press mt-6 rounded-full bg-foreground px-6 py-3 text-[13.5px] font-semibold text-background"
      >
        Clear Filters
      </button>
    </div>
  );
}
