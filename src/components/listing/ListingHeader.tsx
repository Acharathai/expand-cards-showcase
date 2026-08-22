import { ArrowLeft, Heart, Moon, Search, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  title: string;
  count: number;
  wishlistCount?: number;
  onSearch: () => void;
  compact: boolean;
};

export function ListingHeader({ title, count, wishlistCount = 0, onSearch, compact }: Props) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl transition-shadow duration-300"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 10px)",
        boxShadow: compact ? "0 1px 0 var(--color-border)" : "none",
      }}
    >
      <div className="flex items-center gap-2 px-3 pb-2">
        <Link
          to="/"
          aria-label="Back"
          className="press grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground active:bg-muted"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
        </Link>

        <div className="min-w-0 flex-1">
          <h1
            className="truncate font-bold tracking-[-0.025em] text-foreground transition-all duration-300"
            style={{ fontSize: compact ? 16 : 18, lineHeight: 1.2 }}
          >
            {title}
          </h1>
          <p
            className="overflow-hidden text-[12px] font-medium text-muted-foreground transition-all duration-300"
            style={{ height: compact ? 0 : 17, opacity: compact ? 0 : 1 }}
          >
            {count} Stories
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <button
            onClick={onSearch}
            aria-label="Search stories"
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="press grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            {dark ? <Sun size={19} strokeWidth={1.9} /> : <Moon size={19} strokeWidth={1.9} />}
          </button>
          <button
            aria-label="Wishlist"
            className="press relative grid h-10 w-10 place-items-center rounded-full text-foreground active:bg-muted"
          >
            <Heart size={20} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
