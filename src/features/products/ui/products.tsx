import useProductsQuery from "@/features/products/model/hooks/use-products-query";
import ProductFilters from "@/features/products/ui/blocks/product-filters";
import ProductModalWrapper from "@/features/products/ui/blocks/product-modal-wrapper";
import ProductsPagination from "@/features/products/ui/blocks/products-pagination";
import ProductCard from "@/features/products/ui/elements/product-card";
import { memo } from "react";
import ProductsNotFound from "@/features/products/ui/blocks/products-not-found";

const MemoizedProductCard = memo(ProductCard);

const Products = () => {
  // ! I use this type of declaration if many queries exist
  const productsQuery = useProductsQuery();

  if (productsQuery.isError)
    return (
      <p className="text-red-400" role="alert">
        Error: {productsQuery.error?.message}
      </p>
    );

  return (
    <div className="space-y-6">
      <ProductFilters />
      {!productsQuery.isLoading && !productsQuery.hasData && (
        <ProductsNotFound />
      )}
      {productsQuery.isLoading && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-24"
          role="status"
          aria-live="polite"
        >
          <div className="size-10 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
          <p className="mt-4 text-sm text-zinc-400">Loading products…</p>
        </div>
      )}
      {productsQuery.hasData && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <div className="flex justify-center border-t border-zinc-800/80 pt-6">
            <ProductsPagination />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
