import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  placeholder?: string;
  "aria-label"?: string;
  wrapperClassName?: string;
};

export const Select = ({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  className,
  "aria-label": ariaLabel,
  disabled,
  wrapperClassName,
  ...rest
}: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onValueChange(newValue === "" ? undefined : newValue);
  };

  return (
    <div
      className={cn(
        "relative inline-block w-full min-w-[120px]",
        wrapperClassName,
      )}
    >
      <select
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          "w-full hover:cursor-pointer appearance-none rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-3 pr-9 text-sm text-zinc-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
        aria-hidden
      />
    </div>
  );
};
