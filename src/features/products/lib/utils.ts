import { PRICE_STEP, RATING_STEP } from "@/features/products/lib/constants";

export const buildPriceOptions = (
  min: number,
  max: number,
  step: number = PRICE_STEP,
) => {
  const options = [];
  for (let p = min; p <= max; p += step) {
    options.push({ value: String(p), label: String(p) });
  }
  return options;
};

export const buildRatingOptions = (
  min: number,
  max: number,
  step: number = RATING_STEP,
) => {
  const options = [];
  for (let r = min; r <= max; r += step) {
    options.push({ value: String(r), label: String(r) });
  }
  return options;
};
