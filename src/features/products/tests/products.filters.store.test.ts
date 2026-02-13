import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  initialFilters,
  selectProductsFilters,
  useProductsFiltersStore,
} from "@/features/products/model/products.filters.store";

describe("products.filters.store", () => {
  beforeEach(() => {
    useProductsFiltersStore.getState().resetFilters();
  });

  afterEach(() => {
    useProductsFiltersStore.getState().resetFilters();
  });

  describe("initial state", () => {
    it("has default filters with page 1 and limit 8", () => {
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.page).toBe(1);
      expect(filters.limit).toBe(8);
      expect(filters.category).toBeUndefined();
      expect(filters.brand).toBeUndefined();
      expect(filters.minPrice).toBeUndefined();
      expect(filters.maxPrice).toBeUndefined();
      expect(filters.minRating).toBeUndefined();
    });

    it("selectProductsFilters returns filters", () => {
      const state = useProductsFiltersStore.getState();
      expect(selectProductsFilters(state)).toEqual(state.filters);
    });
  });

  describe("changeFilters", () => {
    it("updates category", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ category: "Electronics" });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.category).toBe("Electronics");
    });

    it("updates brand", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ brand: "Brand A" });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.brand).toBe("Brand A");
    });

    it("updates minPrice and maxPrice", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ minPrice: 50, maxPrice: 200 });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.minPrice).toBe(50);
      expect(filters.maxPrice).toBe(200);
    });

    it("updates minRating", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ minRating: 4 });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.minRating).toBe(4);
    });

    it("merges partial updates with existing state", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ category: "Electronics" });
      changeFilters({ brand: "Brand B" });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.category).toBe("Electronics");
      expect(filters.brand).toBe("Brand B");
    });

    it("updates page", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({ page: 2 });
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters.page).toBe(2);
    });
  });

  describe("resetFilters", () => {
    it("restores initial state", () => {
      const changeFilters = useProductsFiltersStore.getState().changeFilters;
      changeFilters({
        category: "Electronics",
        brand: "Brand A",
        minPrice: 10,
        page: 3,
      });
      useProductsFiltersStore.getState().resetFilters();
      const filters = useProductsFiltersStore.getState().filters;
      expect(filters).toEqual(initialFilters.filters);
    });
  });
});
