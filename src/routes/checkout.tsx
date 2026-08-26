import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckoutMark } from "@/components/checkout/CheckoutMark";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import {
  DEFAULT_CHECKOUT_URL,
  EXIT_DURATION_MS,
  WRAPPER_DURATION_MS,
} from "@/components/checkout/checkout-config";

type CheckoutSearch = { next?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch =>
    typeof search["next"] === "string" ? { next: search["next"] } : {},
  head: () => ({
    meta: [
      { title: "Opening payment page — Secure Checkout" },
      {
        name: "description",
        content:
          "Setting up your secure checkout session. You will be taken to the payment page in a moment.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Opening payment page — Secure Checkout" },
      {
        property: "og:description",
        content: "Preparing a secure checkout session before opening the payment page.",
      },
    ],
  }),
  component: CheckoutWrapperPage,
});

function CheckoutWrapperPage() {
  const { next } = Route.useSearch();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const destination = next ?? DEFAULT_CHECKOUT_URL;

    const exitTimer = window.setTimeout(() => setLeaving(true), WRAPPER_DURATION_MS);
    const navTimer = window.setTimeout(() => {
      window.location.assign(destination);
    }, WRAPPER_DURATION_MS + EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(navTimer);
    };
  }, [next]);

  return (
    <div className="checkout-screen fixed inset-0 overflow-hidden">
      <div
        className={`flex h-full w-full flex-col items-center justify-center px-6 ${
          leaving ? "checkout-exit" : ""
        }`}
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8vh)",
        }}
      >
        <CheckoutMark />

        <h1
          className="checkout-rise mt-11 text-center text-[22px] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[25px]"
          style={{ animationDelay: "120ms" }}
        >
          Opening payment page
        </h1>

        <p
          className="checkout-rise mt-3 max-w-[19rem] text-balance text-center text-[14px] font-normal leading-[1.6] tracking-[-0.005em] sm:text-[15px]"
          style={{ animationDelay: "220ms", color: "var(--checkout-muted)" }}
        >
          Please wait a moment while we set up your secure checkout session....
        </p>

        <div className="checkout-rise mt-12" style={{ animationDelay: "320ms" }}>
          <CheckoutProgress />
        </div>
      </div>
    </div>
  );
}
