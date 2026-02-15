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

const categoryPillColors: Record<string, string> = {
  Electronics: "bg-blue-500/90 text-white",
  Footwear: "bg-violet-500/90 text-white",
  Clothing: "bg-amber-600/90 text-white",
  Default: "bg-primary-600/90 text-white",
};

export const getCategoryPillClass = (category: string) =>
  categoryPillColors[category] ?? categoryPillColors.Default;
