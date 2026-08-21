import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  full?: boolean;
};

export function BottomSheet({ open, onClose, title, children, footer, full }: Props) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 transition-opacity duration-300"
        style={{ opacity: shown ? 1 : 0 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[520px] flex-col rounded-t-[26px] bg-card shadow-[0_-12px_40px_-20px_oklch(0.24_0.035_260_/_0.4)]"
        style={{
          maxHeight: full ? "92dvh" : "80dvh",
          height: full ? "92dvh" : undefined,
          transform: shown ? "translateY(0)" : "translateY(100%)",
          transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="flex shrink-0 flex-col items-center pt-3">
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-3">
          <h2 className="text-[19px] font-bold tracking-[-0.02em] text-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close sheet"
            className="press grid h-9 w-9 place-items-center rounded-full bg-muted text-foreground"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
          {children}
        </div>
        {footer ? (
          <div
            className="shrink-0 border-t border-border bg-card px-5 pt-3"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
          >
            {footer}
          </div>
        ) : (
          <div style={{ height: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }} />
        )}
      </div>
    </div>
  );
}
