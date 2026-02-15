import { Calculator } from "lucide-react";
import { binomialCoefficient } from "@/shared/lib/combinatorics";
import { Card, Button, Input, Select } from "@/shared/ui";
import { SYSTEM_BET_OPTIONS } from "@/features/bet-calculator/lib/constants";
import { OddsInput } from "@/features/bet-calculator/ui/elements/odds-input";

type IProps = {
  systemValue: string | undefined;
  onSystemChange: (value: string | undefined) => void;
  odds: (number | "")[];
  onOddsChange: (odds: (number | "")[]) => void;
  stake: string;
  onStakeChange: (value: string) => void;
  onCompute: () => void;
  error: string | null;
};

const selectOptions = SYSTEM_BET_OPTIONS.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

export const CalculatorForm = ({
  systemValue,
  onSystemChange,
  odds,
  onOddsChange,
  stake,
  onStakeChange,
  onCompute,
  error,
}: IProps) => {
  const selectedOption = SYSTEM_BET_OPTIONS.find(
    (o) => o.value === systemValue,
  );
  const n = selectedOption?.n ?? 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompute();
  };

  return (
    <Card
      title=""
      className="calculator-form-card relative overflow-hidden border-primary-500/20 bg-linear-to-b from-zinc-900/80 to-zinc-900/50"
      aria-label="Calculator form"
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-primary-500/60 to-primary-700/40"
        aria-hidden
      />
      <div className="flex items-center gap-2 pl-1">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
          <Calculator className="size-4" aria-hidden />
        </span>
        <h2 className="font-semibold text-zinc-100">System Bet Calculator</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <section className="space-y-2" aria-labelledby="system-label">
          <label
            id="system-label"
            className="block text-sm font-medium text-zinc-300"
          >
            System
          </label>
          <Select
            options={selectOptions}
            value={systemValue}
            onValueChange={onSystemChange}
            placeholder="Select system…"
            aria-label="System bet type"
            wrapperClassName="max-w-[180px]"
            className="border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
          />
          {selectedOption && (
            <p className="mt-1.5 rounded-md bg-zinc-800/50 px-2 py-1 text-xs text-zinc-400">
              System {selectedOption.k} from {selectedOption.n} →{" "}
              <span className="font-medium text-primary-300/90">
                {binomialCoefficient(selectedOption.n, selectedOption.k)}{" "}
                combinations
              </span>
            </p>
          )}
        </section>

        <section className="space-y-2" aria-labelledby="odds-label">
          <label
            id="odds-label"
            className="block text-sm font-medium text-zinc-300"
          >
            Odds ({n} events)
          </label>
          <OddsInput
            odds={odds}
            onOddsChange={onOddsChange}
            count={n}
            aria-label="Odds for each event"
          />
        </section>

        <section className="space-y-2" aria-labelledby="stake-label">
          <label
            id="stake-label"
            htmlFor="stake"
            className="block text-sm font-medium text-zinc-300"
          >
            Total stake
          </label>
          <Input
            id="stake"
            type="number"
            inputMode="decimal"
            min={0.01}
            step={0.01}
            value={stake}
            onChange={(e) => onStakeChange(e.target.value)}
            className="max-w-[160px] border-zinc-600 bg-zinc-800/80 focus:border-primary-500 focus:ring-primary-500/30"
            placeholder="10.00"
            aria-label="Total stake amount"
          />
        </section>

        {error && (
          <p
            className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="gradient"
          className="w-full min-w-0 max-w-[200px]"
        >
          Compute
        </Button>
      </form>
    </Card>
  );
};
