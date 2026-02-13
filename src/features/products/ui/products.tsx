import ProductFilters from "@/features/products/ui/blocks/product-filters";
import { Card } from "@/shared/ui";

const Products = () => {
  return (
    <>
      <ProductFilters />
      <Card title="Feature One" aria-label="Feature one card">
        <p className="mt-1 text-sm text-zinc-400">
          Feature one slice placeholder.
        </p>
      </Card>
    </>
  );
};

export default Products;
