import { BadgeCheck, Download, Play } from "lucide-react";
import type { Order } from "@/data/order";
import { SectionLabel } from "./CopyValue";

export function ProductAccess({
  order,
  onOpen,
  onFiles,
}: {
  order: Order;
  onOpen: () => void;
  onFiles: () => void;
}) {
  const { product } = order;

  return (
    <section>
      <SectionLabel>Your Product</SectionLabel>
      <div className="rounded-3xl bg-card p-4">
        <h3 className="text-[15.5px] font-semibold tracking-[-0.015em] text-foreground">
          {product.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-success">
          <BadgeCheck size={14} strokeWidth={2} />
          {product.accessNote}
        </p>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2.5">
          <button
            type="button"
            onClick={onOpen}
            className="press inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary text-[14px] font-semibold tracking-[-0.01em] text-primary-foreground"
          >
            <Play size={15} strokeWidth={2.2} />
            Open Product
          </button>
          <button
            type="button"
            onClick={onFiles}
            className="press inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[14px] font-semibold tracking-[-0.01em] text-foreground"
          >
            <Download size={15} strokeWidth={2} />
            Get Files
          </button>
        </div>
      </div>
    </section>
  );
}
