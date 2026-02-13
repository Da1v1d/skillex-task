import type { Filters } from "@/features/products/lib/types";
import ProductsApi from "@/features/products/model/products.api";
import { API_KEYS } from "@/shared/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useFiltersQuery = () => {
  return useQuery({
    queryKey: [API_KEYS.PRODUCTS.FILTERS],
    queryFn: () => ProductsApi.getFilters(),
  });
};

export default useFiltersQuery;
