import type { Product } from "@/features/products/lib/types";
import { useToggle } from "@/shared/hooks";
import { Button, Image, Modal } from "@/shared/ui";
import { StarIcon } from "lucide-react";
import type { ReactNode } from "react";

interface IProps extends Product {
  children: (toggleOpen: () => void) => ReactNode;
}

const ProductModalWrapper = ({
  name,
  imageUrl,
  category,
  rating,
  price,
  children,
}: IProps) => {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      {children(toggleOpen)}
      <Modal
        className="[&>div]:max-w-[600px]"
        title="Product Details"
        open={isOpen}
        onClose={() => toggleOpen(false)}
      >
        <>
          <Image
            src={imageUrl}
            alt={name}
            className="w-full h-80 object-cover"
          />
          <p className="bg-primary-700 absolute top-20 right-10 text-primary-100 px-3 py-1 rounded-full text-sm">
            {category}
          </p>
          <div className="space-y-1">
            <h2>{name}</h2>
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 text-sm text-yellow-500 fill-yellow-500" />
              <p className="text-sm">{rating}</p>
            </div>
          </div>
          <p className="text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem provident non possimus dolore voluptas veritatis
            assumenda reprehenderit, nulla ipsum eligendi nemo fuga asperiores?
            Quae perferendis nostrum eius alias vero eaque!
          </p>
          <div className="flex items-center justify-end">
            <Button variant="primary">Buy Now for ${price.toFixed(2)}</Button>
          </div>
        </>
      </Modal>
    </>
  );
};

export default ProductModalWrapper;
