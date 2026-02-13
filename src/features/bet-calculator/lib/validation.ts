import type {
  SystemBetType,
  ValidationResult,
} from "@/features/bet-calculator/lib/types";
import { MAX_ODDS } from "@/features/bet-calculator/lib/constants";

export const validateOdds = (
  odds: number[],
  systemType: SystemBetType,
): ValidationResult => {
  if (!odds || odds.length === 0) {
    return { valid: false, error: "At least one odd is required" };
  }
  if (odds.length !== systemType.n) {
    return {
      valid: false,
      error: `Expected ${systemType.n} odds for ${systemType.k}/${systemType.n} system, got ${odds.length}`,
    };
  }
  const invalidOdds = odds.filter((o) => typeof o !== "number" || o <= 0);
  if (invalidOdds.length > 0) {
    return { valid: false, error: "All odds must be positive numbers" };
  }
  const overflowOdds = odds.filter((o) => o > MAX_ODDS);
  if (overflowOdds.length > 0) {
    return {
      valid: false,
      error: `Odds must not exceed ${MAX_ODDS}`,
    };
  }
  return { valid: true };
};

export const validateStake = (stake: number): ValidationResult => {
  if (typeof stake !== "number" || Number.isNaN(stake)) {
    return { valid: false, error: "Stake must be a valid number" };
  }
  if (stake <= 0) {
    return { valid: false, error: "Stake must be positive" };
  }
  if (!Number.isFinite(stake)) {
    return { valid: false, error: "Stake must be finite" };
  }
  return { valid: true };
};

export const validateSystemType = (systemType: SystemBetType): boolean => {
  if (
    typeof systemType.k !== "number" ||
    typeof systemType.n !== "number" ||
    systemType.k <= 0 ||
    systemType.n <= 0 ||
    systemType.k > systemType.n
  ) {
    return false;
  }
  return true;
};
