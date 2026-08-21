import type { Order } from "@/data/order";
import { formatINR } from "@/data/order";
import { SectionLabel } from "./CopyValue";

export function ProductSummary({ order }: { order: Order }) {
  const { product } = order;

  return (
    <section>
      <SectionLabel>Order Summary</SectionLabel>
      <div className="rounded-3xl bg-card p-4">
        <div className="flex gap-4">
          <img
            src={product.image}
            alt={product.title}
            width={816}
            height={816}
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
              {product.title}
            </h3>
            <p className="mt-1 text-[12.5px] font-medium text-muted-foreground">
              {product.type}
            </p>
            {product.variant ? (
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                {product.variant}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-3.5">
          <div>
            <p className="text-[12px] font-medium text-muted-foreground">Quantity</p>
            <p className="mt-0.5 text-[14px] font-medium tabular-nums text-foreground">
              {product.quantity}
            </p>
          </div>
          <p className="text-[22px] font-semibold tabular-nums tracking-[-0.03em] text-foreground">
            {formatINR(product.price * product.quantity)}
          </p>
        </div>
      </div>
    </section>
  );
}
