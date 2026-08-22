import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { OrderHeader } from "@/components/order/OrderHeader";
import { OrderSuccessHero } from "@/components/order/OrderSuccessHero";
import { ProductSummary } from "@/components/order/ProductSummary";
import { OrderStatus } from "@/components/order/OrderStatus";
import { ProductAccess } from "@/components/order/ProductAccess";
import { OrderDetails } from "@/components/order/OrderDetails";
import { PriceSummary } from "@/components/order/PriceSummary";
import { TransactionInformation } from "@/components/order/TransactionInformation";
import { ReceiptAction } from "@/components/order/ReceiptAction";
import { SupportSection } from "@/components/order/SupportSection";
import { order } from "@/data/order";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Details — Storyfi" },
      {
        name: "description",
        content:
          "View your order details: purchased product, order status, digital access, price summary, receipt and support options.",
      },
      { property: "og:title", content: "Order Details — Atelier Shop" },
      {
        property: "og:description",
        content:
          "A premium mobile order details page with product summary, order status timeline, receipt and support.",
      },
    ],
  }),
  component: OrderDetailsPage,
});

function OrderDetailsPage() {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[520px]">
        <OrderHeader />

        <main
          className="px-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 108px)" }}
        >
          <OrderSuccessHero reference={order.reference} />

          <div className="flex flex-col gap-8">
            <div className="reveal" style={{ animationDelay: "300ms" }}>
              <ProductSummary order={order} />
            </div>

            <OrderStatus steps={order.steps} />

            <div className="reveal" style={{ animationDelay: "420ms" }}>
              <ProductAccess
                order={order}
                onOpen={() => toast("Opening your product")}
                onFiles={() => toast("Preparing your files")}
              />
            </div>

            <div className="reveal" style={{ animationDelay: "480ms" }}>
              <OrderDetails order={order} />
            </div>

            <div className="reveal" style={{ animationDelay: "540ms" }}>
              <PriceSummary order={order} />
            </div>

            <div className="reveal" style={{ animationDelay: "600ms" }}>
              <TransactionInformation order={order} />
            </div>

            <div className="reveal" style={{ animationDelay: "640ms" }}>
              <ReceiptAction order={order} />
            </div>

            <div className="reveal" style={{ animationDelay: "700ms" }}>
              <SupportSection onSelect={(title) => toast(title)} />
            </div>
          </div>
        </main>

        <div
          className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[520px] border-t border-border bg-background/85 px-4 pt-3 backdrop-blur-xl"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
        >
          <button
            type="button"
            onClick={() => toast("Opening your product")}
            className="press h-12 w-full rounded-2xl bg-primary text-[14.5px] font-semibold tracking-[-0.01em] text-primary-foreground"
          >
            Open Product
          </button>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
