import { cn } from "@/shared/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type CardProps = ComponentProps<"div"> & {
  children: ReactNode;
  title?: string;
  className?: string;
  footer?: ReactNode;
  "aria-label"?: string;
};

export const Card = ({
  children,
  title,
  className = "",
  "aria-label": ariaLabel,
  footer,
  ...rest
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-sm",
        className,
      )}
      role={title ? "article" : undefined}
      aria-label={ariaLabel}
      {...rest}
    >
      {title && <h2 className="font-medium text-zinc-100">{title}</h2>}
      {children}
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};
