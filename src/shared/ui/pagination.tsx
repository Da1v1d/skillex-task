import { cn } from "@/shared/lib/utils";
import { Button } from "./button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Number of page number buttons to show on each side of current page */
  siblingCount?: number;
};

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) => {
  const startPage = Math.max(1, page - siblingCount);
  const endPage = Math.min(totalPages, page + siblingCount);
  const pages = totalPages <= 0 ? [] : range(startPage, endPage);

  const handlePrev = () => onPageChange(Math.max(1, page - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, page + 1));

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn("flex items-center gap-2", className)}
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        className="px-3 py-1.5 text-sm"
        onClick={handlePrev}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        Previous
      </Button>
      <ul className="flex items-center gap-1">
        {pages.map((p) => (
          <li key={p}>
            <Button
              variant="ghost"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                p === page
                  ? "bg-primary-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
              )}
            >
              {p}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant="ghost"
        className="px-3 py-1.5 text-sm"
        onClick={handleNext}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  );
};
