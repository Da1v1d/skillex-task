/**
 * Returns the binomial coefficient C(n, k) = n! / (k! * (n - k)!)
 */
export const binomialCoefficient = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
};

/**
 * Generates all combinations of k elements from array arr.
 * Uses recursive algorithm to produce C(n,k) combinations.
 */
export const combinations = <T>(arr: T[], k: number): T[][] => {
  const n = arr.length;
  if (k <= 0 || k > n) return [];
  if (k === n) return [[...arr]];

  const result: T[][] = [];

  const combine = (start: number, combo: T[]) => {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i <= n - (k - combo.length); i++) {
      combo.push(arr[i]);
      combine(i + 1, combo);
      combo.pop();
    }
  };

  combine(0, []);
  return result;
};
