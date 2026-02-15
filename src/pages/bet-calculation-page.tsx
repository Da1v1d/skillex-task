import { Calculator, Sparkles } from "lucide-react";
import { PageHeader } from "@/shared/ui";
import { SystemBetCalculator } from "@/features/bet-calculator/ui/system-bet-calculator";

const BetCalculationPage = () => {
  return (
    <div className="relative min-h-0">
      <PageHeader className="mb-8">
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 ring-1 ring-primary-500/30">
            <Calculator className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
              System Bet Calculator
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Compute potential winnings for system bets (e.g. 2/3, 3/4). Enter
              odds for each event, select the system type, and your total stake.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-primary-400/90">
              <Sparkles className="size-3.5" aria-hidden />
              <span>Combinations & payouts in one click</span>
            </div>
          </div>
        </div>
      </PageHeader>
      <SystemBetCalculator />
    </div>
  );
};

export default BetCalculationPage;
