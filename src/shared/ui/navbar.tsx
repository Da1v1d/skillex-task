import type { ComponentProps, ReactNode } from "react";

type NavbarProps = ComponentProps<"nav"> & {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

const Navbar = ({
  children,
  className = "",
  ariaLabel = "Main navigation",
}: NavbarProps) => {
  return (
    <nav
      className={`border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl sticky z-100 top-0 left-0 right-0 p-5 ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <ul className="flex gap-4">{children}</ul>
    </nav>
  );
};

export default Navbar;
