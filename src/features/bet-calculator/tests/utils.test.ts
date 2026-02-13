import { describe, expect, it } from "vitest";
import { calculateSystemBet } from "@/features/bet-calculator/lib/utils";

describe("utils", () => {
  describe("calculateSystemBet", () => {
    it("calculates 2/3 with odds [2, 3, 4] and stake 30", () => {
      const result = calculateSystemBet([2, 3, 4], { k: 2, n: 3 }, 30);
      expect(result.combinations).toHaveLength(3);
      expect(result.stakePerCombination).toBe(10);

      const combo12 = result.combinations.find(
        (c) => c.indices[0] === 0 && c.indices[1] === 1,
      );
      expect(combo12?.payout).toBe(60); // 10 * 2 * 3

      const combo13 = result.combinations.find(
        (c) => c.indices[0] === 0 && c.indices[1] === 2,
      );
      expect(combo13?.payout).toBe(80); // 10 * 2 * 4

      const combo23 = result.combinations.find(
        (c) => c.indices[0] === 1 && c.indices[1] === 2,
      );
      expect(combo23?.payout).toBe(120); // 10 * 3 * 4

      expect(result.totalReturn).toBe(260);
    });

    it("calculates 3/4 with correct combinations and total", () => {
      const result = calculateSystemBet([1.5, 2, 2.5, 3], { k: 3, n: 4 }, 24);
      expect(result.combinations).toHaveLength(4);
      expect(result.stakePerCombination).toBe(6);

      const total = result.combinations.reduce((sum, c) => sum + c.payout, 0);
      expect(result.totalReturn).toBe(total);
    });

    it("calculates 3/3 (single combination)", () => {
      const result = calculateSystemBet([2, 3, 4], { k: 3, n: 3 }, 10);
      expect(result.combinations).toHaveLength(1);
      expect(result.stakePerCombination).toBe(10);
      expect(result.combinations[0].payout).toBe(240); // 10 * 2 * 3 * 4
      expect(result.totalReturn).toBe(240);
    });

    it("rounds payout to 2 decimal places", () => {
      const result = calculateSystemBet([1.11, 2.22], { k: 2, n: 2 }, 10);
      expect(result.combinations[0].payout).toBe(24.64); // 10 * 1.11 * 2.22 = 24.642
      expect(result.totalReturn).toBe(24.64);
    });
  });
});
