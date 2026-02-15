import { PackageSearch } from "lucide-react";

const ProductsNotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-16 text-center"
      role="status"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-500">
        <PackageSearch className="size-8" aria-hidden />
      </span>
      <p className="mt-4 text-lg font-medium text-zinc-300">
        No products found
      </p>
      <p className="mt-1 text-sm text-zinc-500">
        Try adjusting filters or reset to see all products.
      </p>
    </div>
  );
};

export default ProductsNotFound;
