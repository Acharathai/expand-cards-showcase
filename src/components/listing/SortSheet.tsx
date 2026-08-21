import { Check } from "lucide-react";
import { BottomSheet } from "./BottomSheet";
import { SORT_OPTIONS, type SortKey } from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
  value: SortKey;
  onChange: (key: SortKey) => void;
};

export function SortSheet({ open, onClose, value, onChange }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Sort by">
      <ul className="pb-2">
        {SORT_OPTIONS.map((opt) => {
          const selected = opt.key === value;
          return (
            <li key={opt.key}>
              <button
                onClick={() => {
                  onChange(opt.key);
                  onClose();
                }}
                className="press flex w-full items-center justify-between gap-3 border-b border-border py-4 text-left last:border-0"
              >
                <span
                  className={`text-[15px] tracking-[-0.01em] ${
                    selected ? "font-semibold text-foreground" : "font-normal text-foreground/80"
                  }`}
                >
                  {opt.label}
                </span>
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-200"
                  style={{
                    borderColor: selected ? "var(--color-primary)" : "var(--color-border)",
                    backgroundColor: selected ? "var(--color-primary)" : "transparent",
                  }}
                >
                  {selected && (
                    <Check size={14} strokeWidth={3} className="text-primary-foreground" />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
