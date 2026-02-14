import { cn } from "@/shared/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type CardProps = Omit<ComponentProps<"div">, "id"> & {
  children: ReactNode;
  title?: string;
  className?: string;
  footer?: ReactNode;
  media?: ReactNode;
  "aria-label"?: string;
};

const Card = ({
  children,
  title,
  className = "",
  "aria-label": ariaLabel,
  footer,
  media,
  ...rest
}: CardProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-xl flex flex-col justify-between",
        className,
      )}
      role={title ? "article" : undefined}
      aria-label={ariaLabel}
      {...rest}
    >
      {media && <div className="*:block *:w-full">{media}</div>}
      <div className="gap-1 p-4">
        {title && <h2 className="font-medium text-zinc-100">{title}</h2>}
        {children}
      </div>
      {footer && <div className="p-4 pt-0">{footer}</div>}
    </div>
  );
};

export default Card;
