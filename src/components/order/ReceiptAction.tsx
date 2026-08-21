import { useState } from "react";
import { Receipt } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Order } from "@/data/order";
import { formatINR } from "@/data/order";

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-[12.5px] font-medium text-muted-foreground">{label}</span>
      <span className="max-w-[62%] truncate text-right text-[13px] font-medium tabular-nums text-foreground">
        {value}
      </span>
    </div>
  );
}

export function ReceiptAction({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const { product, pricing, payment } = order;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <section className="flex items-center gap-3.5 rounded-3xl bg-card p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-foreground">
          <Receipt size={17} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">
            Receipt
          </p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
            View or download your order receipt
          </p>
        </div>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="press h-9 shrink-0 rounded-full border border-border px-3.5 text-[13px] font-semibold text-foreground"
          >
            View
          </button>
        </DrawerTrigger>
      </section>

      <DrawerContent className="mx-auto max-w-[520px] border-border bg-background">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-[18px] font-semibold tracking-[-0.02em]">
            Order Receipt
          </DrawerTitle>
          <DrawerDescription className="text-[12.5px]">
            {order.orderDate} · {order.orderTime}
          </DrawerDescription>
        </DrawerHeader>

        <div
          className="px-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
        >
          <div className="rounded-3xl bg-card p-4">
            <div className="divide-y divide-border">
              <Line label="Order ID" value={order.orderId} />
              <Line label="Product" value={product.title} />
              <Line label="Type" value={product.type} />
              <Line label="Quantity" value={String(product.quantity)} />
              <Line label="Price" value={formatINR(pricing.subtotal)} />
              {pricing.discount > 0 ? (
                <Line label="Discount" value={`−${formatINR(pricing.discount)}`} />
              ) : null}
              <Line label="Payment Method" value={payment.method} />
              <Line label="Transaction ID" value={payment.transactionId ?? "—"} />
              <Line label="Order Status" value={order.status} />
            </div>

            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-[13.5px] font-semibold text-foreground">
                Total Paid
              </span>
              <span className="text-[20px] font-semibold tabular-nums tracking-[-0.03em] text-foreground">
                {formatINR(pricing.total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="press mt-3 h-12 w-full rounded-2xl bg-primary text-[14.5px] font-semibold text-primary-foreground"
          >
            Done
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
