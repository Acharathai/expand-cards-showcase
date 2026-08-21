import { ChevronRight, LifeBuoy, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionLabel } from "./CopyValue";

const options: { id: string; title: string; detail: string; icon: LucideIcon }[] = [
  {
    id: "issue",
    title: "Report an Issue",
    detail: "Missing product, wrong order or access problems",
    icon: TriangleAlert,
  },
  {
    id: "support",
    title: "Contact Support",
    detail: "Get help with this order or a refund request",
    icon: LifeBuoy,
  },
];

export function SupportSection({ onSelect }: { onSelect: (title: string) => void }) {
  return (
    <section>
      <SectionLabel>Need Help?</SectionLabel>
      <div className="flex flex-col gap-2.5">
        {options.map(({ id, title, detail, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(title)}
            className="press flex w-full items-center gap-3.5 rounded-2xl bg-card p-3.5 text-left"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-foreground">
              <Icon size={17} strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-semibold tracking-[-0.01em] text-foreground">
                {title}
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
                {detail}
              </span>
            </span>
            <ChevronRight size={17} strokeWidth={2} className="shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </section>
  );
}
