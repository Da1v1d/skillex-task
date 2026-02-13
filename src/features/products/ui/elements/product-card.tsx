import type { Product } from "@/features/products/lib/types";
import { Card } from "@/shared/ui";

interface Props extends Product {
  className?: string;
}

const ProductCard = ({ className, ...product }: Props) => {
  return (
    <Card
      className={className}
      media={
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      }
      footer={<div>{product.price}</div>}
    >
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-zinc-500">{product.category}</p>
    </Card>
  );
};

export default ProductCard;
