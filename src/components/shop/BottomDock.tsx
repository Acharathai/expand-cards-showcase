import { Home, LayoutGrid, Search, Heart, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "categories", label: "Categories", icon: LayoutGrid },
  { id: "search", label: "Search", icon: Search },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "account", label: "Account", icon: User },
];

export function BottomDock({ active = "categories" }: { active?: string }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6px)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-[520px] grid-cols-5 px-2 pt-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <button
                aria-current={isActive ? "page" : undefined}
                className="press flex w-full flex-col items-center gap-1 rounded-2xl py-1.5"
              >
                <span
                  className="relative grid h-8 w-14 place-items-center rounded-full transition-colors duration-300"
                  style={
                    isActive
                      ? { backgroundColor: "var(--tint-pink)" }
                      : undefined
                  }
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.1 : 1.7}
                    className={
                      isActive ? "text-primary" : "text-muted-foreground"
                    }
                  />
                </span>
                <span
                  className={`text-[10.5px] tracking-[-0.01em] transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-foreground"
                      : "font-medium text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
