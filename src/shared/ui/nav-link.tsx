import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

type NavLinkProps = {
  to: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
};

const NavLink = ({
  to,
  label,
  icon: Icon,
  isActive,
  className,
  onClick,
}: NavLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "navbar-link flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
        "hover:bg-white/5 hover:text-zinc-100",
        isActive
          ? "bg-primary-500/15 text-primary-400 ring-1 ring-primary-500/30"
          : "text-zinc-400",
        className,
      )}
      tabIndex={0}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {label}
    </Link>
  );
};

export default NavLink;
