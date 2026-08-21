import type { Order } from "@/data/order";
import { CopyValue, InfoRow, SectionLabel } from "./CopyValue";

export function OrderDetails({ order }: { order: Order }) {
  return (
    <section>
      <SectionLabel>Order Details</SectionLabel>
      <div className="divide-y divide-border">
        <CopyValue label="Order ID" value={order.orderId} copyLabel="Order ID" />
        <InfoRow label="Order Date" value={`${order.orderDate} · ${order.orderTime}`} />
        <InfoRow label="Quantity" value={String(order.product.quantity)} />
        <InfoRow label="Order Status" value={order.status} />
      </div>
    </section>
  );
}
