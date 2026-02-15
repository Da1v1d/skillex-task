import type { Product } from "@/features/products/lib/types";
import { getCategoryPillClass } from "@/features/products/lib/utils";
import { useToggle } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Button, Image, Modal } from "@/shared/ui";
import { Star } from "lucide-react";
import type { ReactNode } from "react";

interface IProps extends Product {
  children: (toggleOpen: () => void) => ReactNode;
}

const ProductModalWrapper = ({
  name,
  imageUrl,
  category,
  brand,
  rating,
  price,
  children,
}: IProps) => {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      {children(toggleOpen)}
      <Modal
        className="[&>div]:max-w-[560px]"
        title={name}
        open={isOpen}
        onClose={() => toggleOpen(false)}
      >
        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-xl bg-zinc-800/50">
            <Image
              src={imageUrl}
              alt={name}
              className="h-64 w-full object-cover"
            />
            <span
              className={cn(
                "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium shadow-lg backdrop-blur-sm",
                getCategoryPillClass(category),
              )}
            >
              {category}
            </span>
          </div>

          {brand && <p className="text-sm text-zinc-500">{brand}</p>}

          <p className="text-sm leading-relaxed text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem provident non possimus dolore voluptas veritatis
            assumenda reprehenderit, nulla ipsum eligendi nemo fuga asperiores?
            Quae perferendis nostrum eius alias vero eaque!
          </p>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <Star className="size-5 fill-amber-400" aria-hidden />
              <span className="font-medium text-zinc-200">
                {rating}
                <span className="ml-1 text-zinc-500">/ 5</span>
              </span>
            </div>
            <Button
              variant="gradient"
              className="w-full sm:w-auto sm:min-w-[180px]"
            >
              Buy now — ${price.toFixed(2)}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductModalWrapper;
