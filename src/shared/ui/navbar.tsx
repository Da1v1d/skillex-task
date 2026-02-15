import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type NavbarProps = ComponentProps<"nav"> & {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Optional brand block (e.g. logo + app name) rendered before the nav list */
  brand?: ReactNode;
};

const Navbar = ({
  children,
  className = "",
  ariaLabel = "Main navigation",
  brand,
}: NavbarProps) => {
  return (
    <nav
      className={cn(
        "sticky top-0 left-0 p-4 px-6 right-0 z-100 border-b border-white/10 bg-zinc-900/90 shadow-lg shadow-black/10 backdrop-blur-xl",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className=" flex items-center justify-between gap-4">
        {brand && (
          <div className="flex shrink-0 items-center gap-2 pr-4">{brand}</div>
        )}
        <ul className="flex flex-1 items-center gap-1 sm:gap-2">{children}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
