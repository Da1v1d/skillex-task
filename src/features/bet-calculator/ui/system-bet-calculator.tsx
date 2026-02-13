import { useState } from "react";
import { SYSTEM_BET_OPTIONS } from "@/features/bet-calculator/lib/constants";
import type { SystemBetType } from "@/features/bet-calculator/lib/types";
import {
  validateOdds,
  validateStake,
  validateSystemType,
} from "@/features/bet-calculator/lib/validation";
import { calculateSystemBet } from "@/features/bet-calculator/lib/utils";

import { CalculatorForm } from "@/features/bet-calculator/ui/blocks/calculator-form";
import { CalculatorResults } from "@/features/bet-calculator/ui/blocks/calculator-results";
import type { SystemBetCalculationResult } from "@/features/bet-calculator/lib/types";

export const SystemBetCalculator = () => {
  const [systemValue, setSystemValue] = useState<string | undefined>("2/3");
  const [odds, setOdds] = useState<(number | "")[]>(["", "", ""]);
  const [stake, setStake] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SystemBetCalculationResult | null>(null);
  const [hasComputed, setHasComputed] = useState(false);

  const selectedOption = SYSTEM_BET_OPTIONS.find(
    (o) => o.value === systemValue,
  );
  const systemType: SystemBetType | undefined = selectedOption
    ? { k: selectedOption.k, n: selectedOption.n }
    : undefined;

  const handleCompute = () => {
    setError(null);

    if (!systemType) {
      setError("Please select a system type");
      return;
    }

    if (!validateSystemType(systemType)) {
      setError("Invalid system type");
      return;
    }

    const numericOdds = odds
      .slice(0, systemType.n)
      .map((o) => (o === "" ? NaN : Number(o)));
    const oddsValidation = validateOdds(numericOdds, systemType);
    if (!oddsValidation.valid) {
      setError(oddsValidation.error ?? "Invalid odds");
      return;
    }

    const stakeNum = parseFloat(stake);
    const stakeValidation = validateStake(stakeNum);
    if (!stakeValidation.valid) {
      setError(stakeValidation.error ?? "Invalid stake");
      return;
    }

    const validOdds = numericOdds as number[];
    const calculation = calculateSystemBet(validOdds, systemType, stakeNum);
    setResult(calculation);
    setHasComputed(true);
  };

  const handleSystemChange = (value: string | undefined) => {
    setSystemValue(value);
    const opt = SYSTEM_BET_OPTIONS.find((o) => o.value === value);
    const n = opt?.n ?? 3;
    setOdds((prev) => {
      const next = [...prev];
      while (next.length < n) next.push("");
      return next.slice(0, n);
    });
  };

  return (
    <div className="space-y-6">
      <CalculatorForm
        systemValue={systemValue}
        onSystemChange={handleSystemChange}
        odds={odds}
        onOddsChange={setOdds}
        stake={stake}
        onStakeChange={setStake}
        onCompute={handleCompute}
        error={error}
      />
      <CalculatorResults result={result} hasComputed={hasComputed} />
    </div>
  );
};
