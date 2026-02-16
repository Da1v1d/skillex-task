import { cn } from "@/shared/lib/utils";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  useEffect,
  useRef,
  type ComponentProps,
  type SyntheticEvent,
} from "react";
import { Button } from "@/shared/ui";

type DrawerProps = Omit<ComponentProps<"aside">, "children"> & {
  open: boolean;
  onClose: (e?: SyntheticEvent) => void;
  children: ReactNode;
  className?: string;
};

const Drawer = ({
  open,
  onClose,
  children,
  className = "",
  ...rest
}: DrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      onClose(e as unknown as SyntheticEvent);
    }
  };

  // TODO: Make custom hook for this
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(e as unknown as SyntheticEvent);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-1000 flex justify-end",
        "bg-black/50 backdrop-blur-sm motion-safe:animate-[drawer-backdrop-fade-in_0.3s_ease-out_forwards]",
        className,
      )}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <aside
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "flex h-full w-full max-w-xs flex-col border-l border-white/10 bg-zinc-900 shadow-2xl",
          "motion-safe:animate-[drawer-slide-in_0.3s_ease-out_forwards]",
        )}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        <div className="flex shrink-0 items-center justify-end border-b border-white/10 p-4">
          <Button
            variant="ghost"
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            onClick={(e) => onClose(e as unknown as SyntheticEvent)}
            aria-label="Close menu"
          >
            <XIcon className="size-5" aria-hidden />
          </Button>
        </div>
        <nav
          className="flex flex-1 flex-col overflow-y-auto p-4"
          aria-label="Main navigation"
        >
          {children}
        </nav>
      </aside>
    </div>
  );
};

export default Drawer;
