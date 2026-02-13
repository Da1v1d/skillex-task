import { describe, expect, it } from "vitest";
import { binomialCoefficient, combinations } from "@/shared/lib/combinatorics";

describe("combinatorics", () => {
  describe("binomialCoefficient", () => {
    it("returns C(3,2) = 3", () => {
      expect(binomialCoefficient(3, 2)).toBe(3);
    });

    it("returns C(4,2) = 6", () => {
      expect(binomialCoefficient(4, 2)).toBe(6);
    });

    it("returns C(4,3) = 4", () => {
      expect(binomialCoefficient(4, 3)).toBe(4);
    });

    it("returns 1 when k = 0", () => {
      expect(binomialCoefficient(5, 0)).toBe(1);
    });

    it("returns 1 when k = n", () => {
      expect(binomialCoefficient(5, 5)).toBe(1);
    });

    it("returns 0 when k > n", () => {
      expect(binomialCoefficient(3, 5)).toBe(0);
    });

    it("returns 0 when k < 0", () => {
      expect(binomialCoefficient(3, -1)).toBe(0);
    });
  });

  describe("combinations", () => {
    it("returns correct combinations for C(3,2)", () => {
      const result = combinations([0, 1, 2], 2);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual([0, 1]);
      expect(result).toContainEqual([0, 2]);
      expect(result).toContainEqual([1, 2]);
    });

    it("returns correct combinations for C(4,3)", () => {
      const result = combinations([0, 1, 2, 3], 3);
      expect(result).toHaveLength(4);
      expect(result).toContainEqual([0, 1, 2]);
      expect(result).toContainEqual([0, 1, 3]);
      expect(result).toContainEqual([0, 2, 3]);
      expect(result).toContainEqual([1, 2, 3]);
    });

    it("returns correct combinations for C(5,2)", () => {
      const result = combinations(["a", "b", "c", "d", "e"], 2);
      expect(result).toHaveLength(10);
      expect(result).toContainEqual(["a", "b"]);
      expect(result).toContainEqual(["a", "c"]);
      expect(result).toContainEqual(["d", "e"]);
    });

    it("returns single combination when k = n", () => {
      const result = combinations([1, 2, 3], 3);
      expect(result).toEqual([[1, 2, 3]]);
    });

    it("returns empty array when k > n", () => {
      const result = combinations([1, 2], 5);
      expect(result).toEqual([]);
    });

    it("returns empty array when k <= 0", () => {
      expect(combinations([1, 2, 3], 0)).toEqual([]);
      expect(combinations([1, 2, 3], -1)).toEqual([]);
    });
  });
});
