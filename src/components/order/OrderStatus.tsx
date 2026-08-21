import { Check } from "lucide-react";
import type { OrderStep } from "@/data/order";
import { SectionLabel } from "./CopyValue";

export function OrderStatus({ steps }: { steps: OrderStep[] }) {
  return (
    <section>
      <SectionLabel>Order Status</SectionLabel>
      <ol className="relative pl-1">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.id}
              className="reveal relative flex gap-3.5 pb-6 last:pb-0"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-px bg-border"
                />
              ) : null}

              <span
                className={`relative z-10 mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full ${
                  step.state === "done"
                    ? "bg-success text-success-foreground"
                    : step.state === "current"
                      ? "border-2 border-success bg-background"
                      : "border border-border bg-background"
                }`}
              >
                {step.state === "done" ? (
                  <Check size={13} strokeWidth={2.6} />
                ) : step.state === "current" ? (
                  <span className="h-[7px] w-[7px] rounded-full bg-success" />
                ) : (
                  <span className="h-[6px] w-[6px] rounded-full bg-muted-foreground/50" />
                )}
              </span>

              <div className="min-w-0 pt-px">
                <p
                  className={`text-[14.5px] font-semibold tracking-[-0.01em] ${
                    step.state === "pending" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
