import { TrendingUp } from "lucide-react";
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
      <Card
        title=""
        className="border-emerald-500/15 bg-linear-to-b from-zinc-900/60 to-zinc-900/40"
        aria-label="Calculation results"
      >
        <div className="flex items-center gap-2 pl-1">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <TrendingUp className="size-4" aria-hidden />
          </span>
          <h2 className="font-semibold text-zinc-100">Results</h2>
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          Select a system, enter odds and stake, then click Compute.
        </p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card
        title=""
        className="border-emerald-500/15 bg-linear-to-b from-zinc-900/60 to-zinc-900/40"
        aria-label="Calculation results"
      >
        <div className="flex items-center gap-2 pl-1">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <TrendingUp className="size-4" aria-hidden />
          </span>
          <h2 className="font-semibold text-zinc-100">Results</h2>
        </div>
        <p className="mt-4 text-sm text-zinc-400">No results to display.</p>
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
    <Card
      title=""
      className="results-card border-emerald-500/20 bg-linear-to-b from-zinc-900/60 to-zinc-900/40"
      aria-label="Calculation results"
    >
      <div className="flex items-center gap-2 pl-1">
        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <TrendingUp className="size-4" aria-hidden />
        </span>
        <h2 className="font-semibold text-zinc-100">Results</h2>
      </div>
      <div className="mt-5 space-y-5">
        <div className="overflow-x-auto rounded-xl border border-zinc-700/80 bg-zinc-900/50">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800/50 text-zinc-400">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Combinations</th>
                <th className="px-4 py-3 font-medium">Odds</th>
                <th className="px-4 py-3 font-medium text-emerald-400/90">
                  Winnings
                </th>
              </tr>
            </thead>
            <tbody>
              {result.combinations.map((combo, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-800/80 transition-colors last:border-b-0 hover:bg-zinc-800/30 [&>td]:px-4 [&>td]:py-3"
                >
                  <td className="text-zinc-400">{i + 1}</td>
                  <td className="text-zinc-100">Events {comboLabels[i]}</td>
                  <td className="text-zinc-300">
                    {formatOdds(oddsProducts[i])}
                  </td>
                  <td className="font-medium text-emerald-300/95">
                    {formatCurrency(combo.payout)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm text-zinc-300">
            Total return:{" "}
            <span className="font-semibold text-emerald-400">
              {formatCurrency(result.totalReturn)}
            </span>
          </p>
          {stake && (
            <p className="text-sm text-zinc-400">
              Stake: <span className="text-zinc-200">{stake}</span>
            </p>
          )}
          <p className="text-sm text-zinc-400">
            Per combination:{" "}
            <span className="text-zinc-200">
              {formatCurrency(result.stakePerCombination)}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};
