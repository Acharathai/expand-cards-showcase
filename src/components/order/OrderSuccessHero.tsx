export function OrderSuccessHero({ reference }: { reference: string }) {
  return (
    <section className="flex flex-col items-center pb-8 pt-4 text-center">
      <span
        className="ring-in grid h-12 w-12 place-items-center rounded-full"
        style={{ backgroundColor: "color-mix(in oklab, var(--success) 16%, transparent)" }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path
            d="M5 12.5l4.2 4.2L19 7"
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-draw"
          />
        </svg>
      </span>

      <h2
        className="reveal mt-4 text-[24px] font-semibold leading-tight tracking-[-0.03em] text-foreground"
        style={{ animationDelay: "160ms" }}
      >
        Order Confirmed
      </h2>
      <p
        className="reveal mt-1.5 max-w-[260px] text-[13.5px] leading-relaxed text-muted-foreground"
        style={{ animationDelay: "260ms" }}
      >
        Your order has been placed successfully.
      </p>
      <p
        className="reveal mt-3 rounded-full border border-border px-3 py-1 text-[12px] font-medium tabular-nums tracking-[0.01em] text-muted-foreground"
        style={{ animationDelay: "340ms" }}
      >
        Order #{reference}
      </p>
    </section>
  );
}
