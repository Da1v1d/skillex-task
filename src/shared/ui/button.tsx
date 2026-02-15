import { cn } from "@/shared/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gradient";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-500",
  secondary:
    "bg-zinc-700 text-zinc-100 hover:bg-zinc-600 focus-visible:ring-zinc-500",
  ghost:
    "bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white focus-visible:ring-zinc-500",
  gradient:
    "bg-linear-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-primary-500 hover:to-primary-400 hover:shadow-primary-500/30 focus-visible:ring-primary-400 active:translate-y-0",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "rounded-full px-4 py-2 hover:cursor-pointer text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
