import { BookOpenText, Heart, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  onSearch: () => void;
};

export function TopBar({ onSearch }: Props) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div
        className="flex items-center justify-between gap-3 px-5 pb-2.5"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-foreground text-background">
            <BookOpenText size={16} strokeWidth={2} />
          </span>
          <span className="text-[16px] font-extrabold tracking-[0.14em] text-foreground">
            STORYFI
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <span
              className="grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: dark ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(1)" }}
            >
              {dark ? <Sun size={19} strokeWidth={1.9} /> : <Moon size={19} strokeWidth={1.9} />}
            </span>
          </button>
          <button
            aria-label="Wishlist"
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Heart size={19} strokeWidth={1.9} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-3.5">
        <button
          onClick={onSearch}
          aria-label="Search stories"
          className="press flex w-full items-center gap-2.5 rounded-full border border-border bg-muted/70 px-4 py-3 text-left shadow-[var(--shadow-card)] transition-colors duration-200 active:bg-muted"
        >
          <Search size={17} strokeWidth={2.1} className="shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-muted-foreground">
            Search stories, genres, platforms…
          </span>
          <kbd className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Search
          </kbd>
        </button>
      </div>
    </header>
  );
}
