import useProductsQuery from "@/features/products/model/hooks/use-products-query";
import ProductFilters from "@/features/products/ui/blocks/product-filters";
import ProductCard from "@/features/products/ui/elements/product-card";

const Products = () => {
  const productsQuery = useProductsQuery();

  if (productsQuery.isLoading) return <div>Loading...</div>;
  if (productsQuery.isError)
    return <div>Error: {productsQuery.error?.message}</div>;

  return (
    <>
      <ProductFilters />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productsQuery.data?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default Products;
