import { Card, Button, Select } from "@/shared/ui";
import { SYSTEM_BET_OPTIONS } from "@/features/bet-calculator/lib/constants";
import { OddsInput } from "../elements/odds-input";

type CalculatorFormProps = {
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
}: CalculatorFormProps) => {
  const selectedOption = SYSTEM_BET_OPTIONS.find(
    (o) => o.value === systemValue,
  );
  const n = selectedOption?.n ?? 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompute();
  };

  return (
    <Card title="System Bet Calculator" aria-label="Calculator form">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-400">
            System type
          </label>
          <Select
            options={selectOptions}
            value={systemValue}
            onValueChange={onSystemChange}
            placeholder="Select system…"
            aria-label="System bet type"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-400">
            Odds ({n} events)
          </label>
          <OddsInput
            odds={odds}
            onOddsChange={onOddsChange}
            count={n}
            aria-label="Odds for each event"
          />
        </div>

        <div>
          <label htmlFor="stake" className="mb-1 block text-sm text-zinc-400">
            Total stake
          </label>
          <input
            id="stake"
            type="number"
            inputMode="decimal"
            min={0.01}
            step={0.01}
            value={stake}
            onChange={(e) => onStakeChange(e.target.value)}
            className="w-full max-w-[140px] rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="10.00"
            aria-label="Total stake amount"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        <Button type="submit">Compute</Button>
      </form>
    </Card>
  );
};
