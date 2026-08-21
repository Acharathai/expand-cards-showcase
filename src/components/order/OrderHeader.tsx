import { ArrowLeft, MoreVertical } from "lucide-react";

export function OrderHeader() {
  return (
    <header
      className="reveal sticky top-0 z-30 bg-background/80 backdrop-blur-xl"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)" }}
    >
      <div className="grid grid-cols-[40px_1fr_40px] items-center gap-2 px-4 pb-3">
        <button
          type="button"
          aria-label="Go back"
          className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>
        <h1 className="text-center text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          Order Details
        </h1>
        <button
          type="button"
          aria-label="More options"
          className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <MoreVertical size={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
