import { Menu, Search, Heart, ShoppingBag } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl">
      <div
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 pb-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            aria-label="Menu"
            className="press -ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>
          <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            ATELIER
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label="Search"
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
          <button
            aria-label="Wishlist"
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Heart size={20} strokeWidth={1.8} />
          </button>
          <button
            aria-label="Cart"
            className="press relative grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              5
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
