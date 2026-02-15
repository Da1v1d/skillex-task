import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Button from "@/shared/ui/button";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  options: SelectOption[];
  value: string | undefined;
  onValueChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string; // trigger classes
  wrapperClassName?: string;
  contentClassName?: string; // dropdown classes
  maxHeight?: number; // px
};

export default function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  disabled,
  "aria-label": ariaLabel,
  className,
  wrapperClassName,
  contentClassName,
  maxHeight = 240,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSelect = (v: string | undefined) => () => {
    onValueChange(v);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative inline-block w-full min-w-[120px]",
        wrapperClassName,
      )}
    >
      <Button
        variant="ghost"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((s) => !s)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-3 pr-2 text-sm text-zinc-100",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <span className={cn("truncate", !selected && "text-zinc-400")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-zinc-400 transition",
            open && "rotate-180",
          )}
        />
      </Button>

      {open && !disabled && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl",
            contentClassName,
          )}
        >
          <div className="p-1" style={{ maxHeight, overflowY: "auto" }}>
            <OptionRow
              active={value === undefined}
              label={placeholder}
              onSelect={onSelect(undefined)}
              muted
            />
            {options.map((opt) => (
              <OptionRow
                key={opt.value}
                active={opt.value === value}
                label={opt.label}
                onSelect={onSelect(opt.value)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OptionRow({
  label,
  active,
  onSelect,
  muted,
}: {
  label: string;
  active?: boolean;
  muted?: boolean;
  onSelect: () => void;
}) {
  return (
    <Button
      variant="ghost"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm",
        "hover:bg-white/5 focus:bg-white/5 focus:outline-none",
        muted ? "text-zinc-400" : "text-zinc-100",
        active && "bg-white/8",
      )}
    >
      <span className="truncate">{label}</span>
      {active ? (
        <Check className="size-4 text-zinc-300" />
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
