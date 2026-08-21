import type { Order } from "@/data/order";
import { formatINR } from "@/data/order";
import { InfoRow, SectionLabel } from "./CopyValue";

export function PriceSummary({ order }: { order: Order }) {
  const { pricing, product } = order;

  return (
    <section>
      <SectionLabel>Price Summary</SectionLabel>
      <div className="rounded-3xl bg-card px-4 py-1">
        <div className="divide-y divide-border">
          <InfoRow label="Product" value={formatINR(pricing.subtotal)} />
          <InfoRow label="Quantity" value={String(product.quantity)} />
          {pricing.discount > 0 ? (
            <div className="flex items-baseline justify-between gap-4 py-3.5">
              <span className="text-[13px] font-medium text-muted-foreground">
                Discount
              </span>
              <span className="text-[14px] font-medium tabular-nums text-success">
                −{formatINR(pricing.discount)}
              </span>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between gap-4 py-4">
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
              Total
            </span>
            <span className="text-[20px] font-semibold tabular-nums tracking-[-0.03em] text-foreground">
              {formatINR(pricing.total)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
