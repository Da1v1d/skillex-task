import { describe, expect, it } from "vitest";
import {
  validateOdds,
  validateStake,
  validateSystemType,
} from "@/features/bet-calculator/lib/validation";

describe("validation", () => {
  describe("validateOdds", () => {
    const system2of3 = { k: 2, n: 3 };

    it("returns valid for correct length and positive odds", () => {
      expect(validateOdds([2, 3, 4], system2of3)).toEqual({ valid: true });
    });

    it("returns error when odds array is empty", () => {
      expect(validateOdds([], system2of3)).toEqual({
        valid: false,
        error: "At least one odd is required",
      });
    });

    it("returns error when odds length does not match n", () => {
      expect(validateOdds([2, 3], system2of3)).toEqual({
        valid: false,
        error: "Expected 3 odds for 2/3 system, got 2",
      });
      expect(validateOdds([2, 3, 4, 5], system2of3)).toEqual({
        valid: false,
        error: "Expected 3 odds for 2/3 system, got 4",
      });
    });

    it("returns error for zero or negative odds", () => {
      expect(validateOdds([2, 0, 4], system2of3)).toEqual({
        valid: false,
        error: "All odds must be positive numbers",
      });
      expect(validateOdds([2, -1, 4], system2of3)).toEqual({
        valid: false,
        error: "All odds must be positive numbers",
      });
    });

    it("returns error when odds exceed max", () => {
      expect(validateOdds([2, 3, 1001], system2of3)).toEqual({
        valid: false,
        error: "Odds must not exceed 1000",
      });
    });
  });

  describe("validateStake", () => {
    it("returns valid for positive stake", () => {
      expect(validateStake(10)).toEqual({ valid: true });
      expect(validateStake(0.5)).toEqual({ valid: true });
    });

    it("returns error for zero stake", () => {
      expect(validateStake(0)).toEqual({
        valid: false,
        error: "Stake must be positive",
      });
    });

    it("returns error for negative stake", () => {
      expect(validateStake(-10)).toEqual({
        valid: false,
        error: "Stake must be positive",
      });
    });

    it("returns error for NaN", () => {
      expect(validateStake(Number.NaN)).toEqual({
        valid: false,
        error: "Stake must be a valid number",
      });
    });

    it("returns error for Infinity", () => {
      expect(validateStake(Number.POSITIVE_INFINITY)).toEqual({
        valid: false,
        error: "Stake must be finite",
      });
    });
  });

  describe("validateSystemType", () => {
    it("returns true for valid system type", () => {
      expect(validateSystemType({ k: 2, n: 3 })).toBe(true);
      expect(validateSystemType({ k: 3, n: 4 })).toBe(true);
      expect(validateSystemType({ k: 4, n: 4 })).toBe(true);
    });

    it("returns false when k > n", () => {
      expect(validateSystemType({ k: 4, n: 3 })).toBe(false);
    });

    it("returns false when k is zero or negative", () => {
      expect(validateSystemType({ k: 0, n: 3 })).toBe(false);
      expect(validateSystemType({ k: -1, n: 3 })).toBe(false);
    });

    it("returns false when n is zero or negative", () => {
      expect(validateSystemType({ k: 2, n: 0 })).toBe(false);
      expect(validateSystemType({ k: 2, n: -1 })).toBe(false);
    });
  });
});
