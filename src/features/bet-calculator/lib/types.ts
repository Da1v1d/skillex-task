// System bet calculator types
export type SystemBetType = { k: number; n: number };

export type CombinationResult = {
  indices: number[];
  odds: number[];
  payout: number;
};

export type SystemBetCalculationResult = {
  combinations: CombinationResult[];
  stakePerCombination: number;
  totalReturn: number;
};

export type ValidationResult = { valid: boolean; error?: string };
