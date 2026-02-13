import { Card } from "@/shared/ui";
import type { SystemBetCalculationResult } from "@/features/bet-calculator/lib/types";
import {
  formatCurrency,
  formatOdds,
} from "@/features/bet-calculator/lib/utils";

type IProps = {
  result: SystemBetCalculationResult | null;
  hasComputed: boolean;
  stake?: string;
};

export const CalculatorResults = ({ result, hasComputed, stake }: IProps) => {
  if (!hasComputed) {
    return (
      <Card title="Results" aria-label="Calculation results">
        <p className="text-zinc-400">
          Select a system, enter odds and stake, then click Compute.
        </p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card title="Results" aria-label="Calculation results">
        <p className="text-zinc-400">No results to display.</p>
      </Card>
    );
  }

  const comboLabels = result.combinations.map((c) =>
    c.indices.map((i) => i + 1).join(" + "),
  );
  const oddsProducts = result.combinations.map((c) =>
    c.odds.reduce((a, b) => a * b, 1),
  );

  return (
    <Card title="Results" aria-label="Calculation results">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-400">
                <th className="pb-2 pr-4 font-medium">#</th>
                <th className="pb-2 pr-4 font-medium">Combinations</th>
                <th className="pb-2 pr-4 font-medium">Odds</th>
                <th className="pb-2 font-medium">Winnings</th>
              </tr>
            </thead>
            <tbody>
              {result.combinations.map((combo, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-800 last:border-b-0 [&>td]:py-3 [&>td]:pr-4"
                >
                  <td className="text-zinc-400">{i + 1}</td>
                  <td className="text-zinc-100">Events {comboLabels[i]}</td>
                  <td className="text-zinc-300">
                    {formatOdds(oddsProducts[i])}
                  </td>
                  <td className="text-zinc-100">
                    {formatCurrency(combo.payout)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-1 border-t border-zinc-700 pt-4">
          <p className="text-zinc-400">
            Winnings:{" "}
            <span className="font-medium text-zinc-100">
              {formatCurrency(result.totalReturn)}
            </span>
          </p>
          {stake && (
            <p className="text-zinc-400">
              Stake: <span className="text-zinc-100">{stake}</span>
            </p>
          )}
          <p className="text-zinc-400">
            Stake per combination:{" "}
            <span className="text-zinc-100">
              {formatCurrency(result.stakePerCombination)}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};
