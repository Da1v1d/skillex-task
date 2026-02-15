import { Package, Sparkles } from "lucide-react";
import { PageHeader } from "@/shared/ui";
import Products from "@/features/products/ui/products";

const ProductsPage = () => {
  return (
    <div className="relative min-h-0 space-y-6">
      <PageHeader>
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/20 text-primary-400 ring-1 ring-primary-500/30">
            <Package className="size-6" aria-hidden />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 md:text-3xl">
              Products
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Browse and filter by category, brand, price, and rating. Open a
              product to view full details.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-primary-400/90">
              <Sparkles className="size-3.5" aria-hidden />
              <span>Filter, compare, and explore</span>
            </div>
          </div>
        </div>
      </PageHeader>
      <Products />
    </div>
  );
};

export default ProductsPage;
