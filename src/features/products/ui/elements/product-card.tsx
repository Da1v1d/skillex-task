import type { Product } from "@/features/products/lib/types";
import { getCategoryPillClass } from "@/features/products/lib/utils";
import { cn } from "@/shared/lib/utils";
import { Card, Image } from "@/shared/ui";
import { Star } from "lucide-react";

interface Props extends Product {
  className?: string;
  onClick?: () => void;
}

const ProductCard = ({ className, onClick, ...product }: Props) => {
  const originalPrice = (Number(product.price) + 20).toFixed(2);
  const currentPrice = product.price.toFixed(2);

  return (
    <Card
      className={cn(
        "product-card card-animate group relative flex flex-col border-primary-500/15 bg-linear-to-b from-zinc-900/60 to-zinc-900/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/30 cursor-pointer",
        className,
      )}
      onClick={onClick}
      media={
        <div className="relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden
          />
          <span
            className={cn(
              "absolute top-2 right-2 rounded-full px-2.5 py-1 text-xs font-medium shadow-lg backdrop-blur-sm",
              getCategoryPillClass(product.category),
            )}
          >
            {product.category}
          </span>
        </div>
      }
      footer={
        <div className="flex items-end justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="size-4 fill-amber-400" aria-hidden />
            <span className="text-sm font-medium text-zinc-200">
              {product.rating}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs line-through text-zinc-500">
              $ {originalPrice}
            </p>
            <p className="text-lg font-semibold text-emerald-400">
              $ {currentPrice}
            </p>
          </div>
        </div>
      }
    >
      <h3 className="text-base font-semibold leading-tight text-zinc-100">
        {product.name}
      </h3>
      <p className="text-sm text-zinc-400">{product.brand}</p>
    </Card>
  );
};

export default ProductCard;
