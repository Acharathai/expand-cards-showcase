import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyValue({
  label,
  value,
  copyLabel,
}: {
  label: string;
  value: string;
  copyLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard unavailable — still show feedback
    }
    setCopied(true);
    toast(`${copyLabel ?? label} copied`);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="press group flex w-full items-start justify-between gap-4 py-3.5 text-left"
      aria-label={`Copy ${copyLabel ?? label}`}
    >
      <span className="pt-0.5 text-[13px] font-medium text-muted-foreground">
        {label}
      </span>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate text-[14px] font-medium tabular-nums tracking-[-0.01em] text-foreground">
          {value}
        </span>
        <span className="relative grid h-4 w-4 shrink-0 place-items-center">
          <Copy
            size={14}
            strokeWidth={1.8}
            className={`absolute text-muted-foreground transition-all duration-200 ${
              copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <Check
            size={14}
            strokeWidth={2.2}
            className={`absolute text-success transition-all duration-200 ${
              copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </span>
      </span>
    </button>
  );
}

export function InfoRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3.5">
      <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
      <span
        className={
          strong
            ? "text-[15px] font-semibold tabular-nums tracking-[-0.01em] text-foreground"
            : "text-[14px] font-medium tabular-nums tracking-[-0.01em] text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h2>
  );
}
