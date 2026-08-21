import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Order } from "@/data/order";
import { formatINR } from "@/data/order";
import { CopyValue, InfoRow } from "./CopyValue";

export function TransactionInformation({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const { payment } = order;

  return (
    <section className="rounded-3xl bg-card px-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="press flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span>
          <span className="block text-[14.5px] font-semibold tracking-[-0.01em] text-foreground">
            Transaction Information
          </span>
          <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
            Payment method, IDs and amount
          </span>
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-border border-t border-border pb-1">
            <InfoRow label="Amount Paid" value={formatINR(payment.amount)} strong />
            <InfoRow label="Payment Method" value={payment.method} />
            <InfoRow label="Source" value={payment.source} />
            {payment.paymentId ? (
              <CopyValue label="Payment ID" value={payment.paymentId} />
            ) : (
              <InfoRow label="Payment ID" value="—" />
            )}
            {payment.transactionId ? (
              <CopyValue label="Reference ID" value={payment.transactionId} />
            ) : (
              <InfoRow label="Reference ID" value="—" />
            )}
            <InfoRow label="Date" value={payment.date} />
          </div>
        </div>
      </div>
    </section>
  );
}
