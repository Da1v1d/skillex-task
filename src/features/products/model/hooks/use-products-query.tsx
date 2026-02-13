import type { Product } from "@/features/products/lib/types";
import ProductsApi from "@/features/products/model/products.api";
import {
  selectProductsFilters,
  useProductsFiltersStore,
} from "@/features/products/model/products.filters.store";
import { API_KEYS } from "@/shared/lib/constants";
import type { QueryProps, Response } from "@/shared/lib/types";
import { useQuery } from "@tanstack/react-query";

type UseProductsQueryProps = QueryProps<
  typeof ProductsApi.getAll,
  Response<Product[]>
>;

const useProductsQuery = (props: UseProductsQueryProps = {}) => {
  const productsFilters = useProductsFiltersStore(selectProductsFilters);

  const query = useQuery({
    queryKey: [API_KEYS.PRODUCTS.ALL, JSON.stringify(productsFilters)],
    queryFn: () => ProductsApi.getAll({ ...productsFilters }),
    ...props,
  });

  const { totalPages, page, limit, total } = query.data?.pagination ?? {
    totalPages: 0,
    page: 0,
    limit: 0,
    total: 0,
  };

  // ! Can be optimized by using the useMemo hook, but it's not necessary for list of 5 items
  const data = query.data?.data ?? [];

  return {
    ...query,
    totalPages,
    page,
    limit,
    total,
    data,
  };
};

export default useProductsQuery;
