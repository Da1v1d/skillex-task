import { SystemBetCalculator } from "@/features/bet-calculator/ui/system-bet-calculator";

const BetCalculationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">
          System Bet Calculator
        </h1>
        <p className="mt-2 text-zinc-400">
          Compute potential winnings for system bets (e.g. 2/3, 3/4). Enter odds
          for each event, select the system type, and your total stake.
        </p>
      </div>
      <SystemBetCalculator />
    </div>
  );
};

export default BetCalculationPage;
