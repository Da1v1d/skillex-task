import type { Product } from "@/features/products/lib/types";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui";
import { StarIcon } from "lucide-react";

interface Props extends Product {
  className?: string;
}

const ProductCard = ({ className, ...product }: Props) => {
  return (
    <Card
      className={cn(
        "transition-transform relative duration-200 hover:scale-[1.01] hover:shadow-lg hover:cursor-pointer",
        className,
      )}
      media={
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      }
      footer={
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-1">
            <StarIcon className="size-4 text-yellow-500 fill-yellow-500" />
            <p className="">{product.rating}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm line-through text-zinc-500">
              $ {(Number(product.price) + 20).toFixed(2)}
            </p>
            <p className="text-lg font-medium text-right">
              $ {product.price.toFixed(2)}
            </p>
          </div>
        </div>
      }
    >
      <h3 className="text-lg font-medium">{product.name}</h3>
      <h3 className="text-sm text-zinc-500">{product.brand}</h3>
      <p className="absolute top-2 right-2 rounded-2xl bg-primary-700 px-3 py-1 text-sm ">
        {product.category}
      </p>
    </Card>
  );
};

export default ProductCard;
