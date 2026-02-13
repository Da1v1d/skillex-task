import { create } from "zustand";
import type { ProductsRequest } from "@/features/products/lib/types";

type ProductsFiltersState = {
  filters: ProductsRequest;
};

type ProductsFiltersActions = {
  changeFilters: (filters: Partial<ProductsFiltersState["filters"]>) => void;
  resetFilters: () => void;
};

const defaultState: ProductsFiltersState = {
  filters: {
    page: 1,
    limit: 10,
    category: undefined,
    brand: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  },
};

export const useProductsFiltersStore = create<
  ProductsFiltersState & ProductsFiltersActions
>((set) => ({
  ...defaultState,
  changeFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () => set(defaultState),
}));

export const selectProductsFilters = (state: ProductsFiltersState) =>
  state.filters;

export const selectChangeFilters = (state: ProductsFiltersActions) =>
  state.changeFilters;
export const selectResetFilters = (state: ProductsFiltersActions) =>
  state.resetFilters;

// ! Example of that AI will not replace us unnecessary code
// - don't seperate state and actions types
// - create many setters for each filter
// - don't use partial state updates

// import { create } from "zustand";
// import type { Filters, ProductsRequest } from "@/features/products/lib/types";

// type ProductsFiltersState = ProductsRequest & {
//   availableFilters: Filters | null;
//   setAvailableFilters: (filters: Filters | null) => void;
//   setPage: (page: number) => void;
//   setLimit: (limit: number) => void;
//   setCategory: (category: ProductsRequest["category"]) => void;
//   setBrand: (brand: ProductsRequest["brand"]) => void;
//   setMinPrice: (minPrice: number | undefined) => void;
//   setMaxPrice: (maxPrice: number | undefined) => void;
//   setMinRating: (minRating: number | undefined) => void;
//   setFilters: (filters: Partial<ProductsRequest>) => void;
//   resetFilters: () => void;
// };

// const defaultState: ProductsRequest = {
//   page: 1,
//   limit: 10,
//   category: undefined,
//   brand: undefined,
//   minPrice: undefined,
//   maxPrice: undefined,
//   minRating: undefined,
// };

// export const useProductsFiltersStore = create<ProductsFiltersState>((set) => ({
//   ...defaultState,
//   availableFilters: null,

//   setAvailableFilters: (availableFilters) => set({ availableFilters }),

//   setPage: (page) => set({ page }),

//   setLimit: (limit) => set({ limit, page: 1 }),

//   setCategory: (category) => set({ category, page: 1 }),

//   setBrand: (brand) => set({ brand, page: 1 }),

//   setMinPrice: (minPrice) => set({ minPrice, page: 1 }),

//   setMaxPrice: (maxPrice) => set({ maxPrice, page: 1 }),

//   setMinRating: (minRating) => set({ minRating, page: 1 }),

//   setFilters: (filters) => set((state) => ({ ...state, ...filters, page: 1 })),

//   resetFilters: () => set(defaultState),
// }));
