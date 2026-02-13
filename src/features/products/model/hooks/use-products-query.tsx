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

  return useQuery({
    queryKey: [API_KEYS.PRODUCTS.ALL, JSON.stringify(productsFilters)],
    queryFn: () => ProductsApi.getAll({ ...productsFilters }),
    select: (data) => data.data,
    ...props,
  });
};

export default useProductsQuery;
