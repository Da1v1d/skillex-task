import useProductsQuery from "@/features/products/model/hooks/use-products-query";
import ProductFilters from "@/features/products/ui/blocks/product-filters";
import ProductModalWrapper from "@/features/products/ui/blocks/product-modal-wrapper";
import ProductsPagination from "@/features/products/ui/blocks/products-pagination";
import ProductCard from "@/features/products/ui/elements/product-card";
import { memo } from "react";

const MemoizedProductCard = memo(ProductCard);

const Products = () => {
  // ! I use this type of declaration if many queries exist
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <p>Loading...</p>;
  if (productsQuery.isError)
    return (
      <p className="text-red-400" role="alert">
        Error: {productsQuery.error?.message}
      </p>
    );

  return (
    <div className="space-y-8">
      <ProductFilters />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsQuery.data?.map((product) => (
          <ProductModalWrapper key={product.id} {...product}>
            {(toggleOpen) => (
              <MemoizedProductCard
                key={product.id}
                onClick={toggleOpen}
                {...product}
              />
            )}
          </ProductModalWrapper>
        ))}
      </div>
      <ProductsPagination />
    </div>
  );
};

export default Products;
