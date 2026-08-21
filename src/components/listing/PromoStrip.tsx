import { Truck } from "lucide-react";
import { useEffect, useState } from "react";

export type Promo = { icon?: "shipping"; text: string };

export function PromoStrip({ promo }: { promo: Promo }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="px-3 pb-2">
      <div
        className="flex items-center justify-center gap-2 rounded-[14px] bg-foreground px-4 py-2.5"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(-16px)",
          transition: "opacity 340ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <Truck size={15} strokeWidth={1.9} className="shrink-0 text-background" />
        <p className="truncate text-[11.5px] font-semibold uppercase tracking-[0.09em] text-background">
          {promo.text}
        </p>
      </div>
    </div>
  );
}
