import { Input } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

type OddsInputProps = {
  odds: (number | "")[];
  onOddsChange: (odds: (number | "")[]) => void;
  count: number;
  "aria-label"?: string;
  className?: string;
};

export const OddsInput = ({
  odds,
  onOddsChange,
  count,
  "aria-label": ariaLabel = "Odds for each event",
  className,
}: OddsInputProps) => {
  const handleOddsChange = (index: number, value: string) => {
    const next = [...odds];
    const parsed = value === "" ? "" : parseFloat(value);
    next[index] = parsed;
    onOddsChange(next);
  };

  const displayOdds = Array.from({ length: count }, (_, i) =>
    i < odds.length ? odds[i] : "",
  );

  return (
    <div className={cn("space-y-2", className)} aria-label={ariaLabel}>
      <div className="flex flex-wrap items-end gap-3">
        {displayOdds.map((odd, index) => (
          <label
            key={index}
            className="flex flex-col gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/50 px-3 py-2 transition-colors focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/30"
          >
            <span className="text-xs font-medium text-zinc-400">
              Event {index + 1}
            </span>
            <Input
              type="number"
              inputMode="decimal"
              min={0.01}
              max={1000}
              step={0.01}
              value={odd}
              onChange={(e) => handleOddsChange(index, e.target.value)}
              className="w-20 border-0 bg-transparent p-0 focus:ring-0"
              placeholder="1.50"
              aria-label={`Odd for event ${index + 1}`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
