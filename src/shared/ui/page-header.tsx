import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type PageHeaderProps = {
  children: ReactNode;
  className?: string;
};

const PageHeader = ({ children, className }: PageHeaderProps) => {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 via-zinc-900/70 to-primary-900/20 px-6 py-6 shadow-xl shadow-black/20 backdrop-blur-sm md:px-8 md:py-7",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,80,220,0.15),transparent)]"
        aria-hidden
      />
      {children}
    </header>
  );
};

export default PageHeader;
