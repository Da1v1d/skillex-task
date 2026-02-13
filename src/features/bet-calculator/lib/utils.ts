import { combinations } from "@/shared/lib/combinatorics";
import type {
  CombinationResult,
  SystemBetCalculationResult,
  SystemBetType,
} from "@/features/bet-calculator/lib/types";

const roundCurrency = (value: number): number => Math.round(value * 100) / 100;

export const calculateSystemBet = (
  odds: number[],
  systemType: SystemBetType,
  stake: number,
): SystemBetCalculationResult => {
  const indices = Array.from({ length: systemType.n }, (_, i) => i);
  const indexCombos = combinations(indices, systemType.k);
  const stakePerCombination = roundCurrency(stake / indexCombos.length);

  const comboResults: CombinationResult[] = indexCombos.map((comboIndices) => {
    const comboOdds = comboIndices.map((i) => odds[i]);
    const oddsProduct = comboOdds.reduce((acc, o) => acc * o, 1);
    const payout = roundCurrency(stakePerCombination * oddsProduct);
    return {
      indices: comboIndices,
      odds: comboOdds,
      payout,
    };
  });

  const totalReturn = roundCurrency(
    comboResults.reduce((sum, c) => sum + c.payout, 0),
  );

  return {
    combinations: comboResults,
    stakePerCombination,
    totalReturn,
  };
};

export const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
): string =>
  Number.isNaN(value) ? "-" : value.toLocaleString(undefined, options);

export const formatCurrency = (value: number): string =>
  formatNumber(value, { minimumFractionDigits: 2 });

export const formatOdds = (value: number): string =>
  Number.isNaN(value) ? "-" : value.toFixed(2);
