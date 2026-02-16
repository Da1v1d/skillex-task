import { Filter, RotateCcw } from "lucide-react";
import type { ProductsRequest } from "@/features/products/lib/types";
import {
  initialFilters,
  selectChangeFilters,
  selectProductsFilters,
  selectResetFilters,
  useProductsFiltersStore,
} from "@/features/products/model/products.filters.store";
import useFiltersQuery from "@/features/products/model/hooks/use-filters-query";
import { Button, Select } from "@/shared/ui";
import {
  buildPriceOptions,
  buildRatingOptions,
} from "@/features/products/lib/utils";

const ProductFilters = () => {
  const filtersQuery = useFiltersQuery();
  const filters = useProductsFiltersStore(selectProductsFilters);
  const changeFilters = useProductsFiltersStore(selectChangeFilters);
  const resetFilters = useProductsFiltersStore(selectResetFilters);

  if (filtersQuery.isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/50 px-4 py-6">
        <p className="text-sm text-zinc-400" role="status">
          Loading filters…
        </p>
      </div>
    );
  }

  if (filtersQuery.isError || !filtersQuery.data) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-6">
        <p className="text-sm text-red-400" role="alert">
          Failed to load filters
        </p>
      </div>
    );
  }

  const data = filtersQuery.data;
  const hasData =
    data.categories.length > 0 &&
    data.brands.length > 0 &&
    data.priceRange.min !== data.priceRange.max &&
    data.ratingRange.min !== data.ratingRange.max;

  // TODO: Can be memoized
  const categoryOptions = data.categories.map((c) => ({ value: c, label: c }));
  const brandOptions = data.brands.map((b) => ({ value: b, label: b }));

  // TODO: Can be memoized
  const priceOptions = buildPriceOptions(
    data.priceRange.min,
    data.priceRange.max,
  );

  // TODO: Can be memoized
  const ratingOptions = buildRatingOptions(
    data.ratingRange.min,
    data.ratingRange.max,
  );

  const isDefaultFilters =
    JSON.stringify(filters) === JSON.stringify(initialFilters);

  if (!hasData) {
    return null;
  }

  return (
    <div
      className="relative rounded-2xl bg-linear-to-b from-zinc-900/80 to-zinc-900/50 shadow-lg shadow-black/20"
      role="group"
      aria-label="Product filters"
    >
      <div className="flex sm:flex-row flex-col flex-wrap items-end sm:gap-4 gap-2 p-4">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-500/15 text-primary-400">
            <Filter className="size-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-zinc-200">Filters</span>
        </div>
        {
          // TODO: Create a custom select component in shared/ui
        }
        {data.categories.length > 0 && (
          <div className="flex sm:w-[unset] w-full flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">
              Category
            </label>
            <Select
              options={categoryOptions}
              value={filters.category}
              onValueChange={(value) =>
                changeFilters({
                  category: value as ProductsRequest["category"],
                })
              }
              placeholder="All categories"
              aria-label="Filter by category"
              className="min-w-[140px] border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
            />
          </div>
        )}
        {data.brands.length > 0 && (
          <div className="flex sm:w-[unset] w-full flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">Brand</label>
            <Select
              options={brandOptions}
              value={filters.brand}
              onValueChange={(value) =>
                changeFilters({
                  brand: value as ProductsRequest["brand"],
                })
              }
              placeholder="All brands"
              aria-label="Filter by brand"
              className="min-w-[120px] border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
            />
          </div>
        )}
        {!!data.priceRange.min && (
          <div className="flex sm:w-[unset] w-full flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">
              Min price
            </label>
            <Select
              options={priceOptions}
              value={filters.minPrice != null ? String(filters.minPrice) : ""}
              onValueChange={(value) =>
                changeFilters({
                  minPrice: value ? Number(value) : undefined,
                })
              }
              placeholder="Any"
              aria-label="Minimum price"
              className="min-w-[90px] border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
            />
          </div>
        )}
        {!!data.priceRange.max && (
          <div className="flex sm:w-[unset] w-full flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">
              Max price
            </label>
            <Select
              options={priceOptions}
              value={filters.maxPrice != null ? String(filters.maxPrice) : ""}
              onValueChange={(value) =>
                changeFilters({
                  maxPrice: value ? Number(value) : undefined,
                })
              }
              placeholder="Any"
              aria-label="Maximum price"
              className="min-w-[90px] border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
            />
          </div>
        )}
        {!!data.ratingRange.min && (
          <div className="flex sm:w-[unset] w-full  flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">
              Min rating
            </label>
            <Select
              options={ratingOptions}
              value={filters.minRating != null ? String(filters.minRating) : ""}
              onValueChange={(value) =>
                changeFilters({
                  minRating: value ? Number(value) : undefined,
                })
              }
              placeholder="Any"
              aria-label="Minimum rating"
              className="min-w-[80px] border-zinc-600 bg-zinc-800/80 hover:border-primary-500/50 focus-visible:border-primary-500"
            />
          </div>
        )}
        <Button
          variant="ghost"
          className="ml-auto sm:mt-0 mt-2 flex items-center gap-2 border border-zinc-600 text-zinc-400 hover:border-primary-500/50 hover:text-primary-400 hover:bg-primary-500/10"
          disabled={isDefaultFilters}
          onClick={resetFilters}
          aria-label="Reset all filters"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Reset filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
