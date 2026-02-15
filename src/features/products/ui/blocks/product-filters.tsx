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
      <p className="text-sm text-zinc-400" role="status">
        Loading filters…
      </p>
    );
  }

  if (filtersQuery.isError || !filtersQuery.data) {
    return (
      <p className="text-sm text-red-400" role="alert">
        Failed to load filters
      </p>
    );
  }

  const data = filtersQuery.data;
  const hasData =
    data.categories.length > 0 &&
    data.brands.length > 0 &&
    data.priceRange.min !== data.priceRange.max &&
    data.ratingRange.min !== data.ratingRange.max;

  const categoryOptions = data.categories.map((c) => ({ value: c, label: c }));
  const brandOptions = data.brands.map((b) => ({ value: b, label: b }));
  const priceOptions = buildPriceOptions(
    data.priceRange.min,
    data.priceRange.max,
  );
  const ratingOptions = buildRatingOptions(
    data.ratingRange.min,
    data.ratingRange.max,
  );

  if (!hasData) {
    return null;
  }

  // TODO: Add range selector instead of two selects
  // TODO: Make filters onChange reset page to 1 in store
  // ? we can use filters with nuq library instead of store
  return (
    <div
      className="flex flex-wrap items-center gap-4"
      role="group"
      aria-label="Product filters"
    >
      {data.categories.length > 0 && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-category"
            className="text-xs font-medium text-zinc-400"
          >
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
          />
        </div>
      )}
      {data.brands.length > 0 && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-brand"
            className="text-xs font-medium text-zinc-400"
          >
            Brand
          </label>
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
          />
        </div>
      )}
      {
        // ? Use range selector instead of two selects
      }
      {!!data.priceRange.min && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-min-price"
            className="text-xs font-medium text-zinc-400"
          >
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
          />
        </div>
      )}
      {!!data.priceRange.max && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-max-price"
            className="text-xs font-medium text-zinc-400"
          >
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
          />
        </div>
      )}
      {!!data.ratingRange.min && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filter-min-rating"
            className="text-xs font-medium text-zinc-400"
          >
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
          />
        </div>
      )}
      <Button
        variant="ghost"
        className="mt-4 text-zinc-400"
        disabled={JSON.stringify(filters) === JSON.stringify(initialFilters)}
        onClick={resetFilters}
      >
        Reset filters
      </Button>
    </div>
  );
};

export default ProductFilters;
