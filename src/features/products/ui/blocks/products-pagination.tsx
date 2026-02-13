import useProductsQuery from "@/features/products/model/hooks/use-products-query";
import {
  selectChangeFilters,
  useProductsFiltersStore,
} from "@/features/products/model/products.filters.store";
import { Pagination } from "@/shared/ui";

const ProductsPagination = () => {
  const changeFilters = useProductsFiltersStore(selectChangeFilters);
  const { page, totalPages } = useProductsQuery();

  const handlePageChange = (newPage: number) => {
    changeFilters({ page: newPage });
  };

  return (
    <div className="flex justify-end items-center">
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPagination;
