import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const baseStyles =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

export const Input = ({
  className = "",
  ref,
  ...rest
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  return (
    <input
      ref={ref}
      className={cn(baseStyles, className)}
      tabIndex={rest.disabled ? -1 : 0}
      {...rest}
    />
  );
};
