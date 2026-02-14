import { useDebouncedValue } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { XIcon } from "lucide-react";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type SyntheticEvent,
} from "react";

const DIALOG_ANIMATION_MS = 250;

type ModalProps = ComponentProps<"dialog"> & {
  title?: string;
  className?: string;
};

export const Modal = ({
  children,
  title,
  className = "",
  ref,
  onClose,
  ...rest
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => dialogRef?.current as HTMLDialogElement);

  const debouncedOpen = useDebouncedValue(rest.open, DIALOG_ANIMATION_MS);

  const closeHandler = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    dialogRef.current?.close();
    onClose?.(e);
  };

  const onOutsideClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      closeHandler(e as unknown as SyntheticEvent<HTMLDialogElement, Event>);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler(e as unknown as SyntheticEvent<HTMLDialogElement, Event>);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // disable scroll when modal is open
    if (rest.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [rest.open]);

  return (
    <dialog
      onClose={closeHandler}
      onClick={onOutsideClick}
      className={cn(
        "dialog-animate fixed inset-0 m-0 p-0 z-1000 max-w-none max-h-none w-screen h-screen bg-black/30 backdrop-blur-sm",
        (rest.open || debouncedOpen) && "flex items-center justify-center",
        className,
      )}
      aria-labelledby={title ? "modal-title" : undefined}
      ref={dialogRef}
      {...rest}
    >
      <div
        ref={contentRef}
        className="rounded-2xl relative space-y-4 border min-h-12 min-w-96 border-white/10 bg-zinc-900/95 p-6 shadow-xl "
      >
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            className="rounded-full p-2"
            onClick={(e) =>
              closeHandler(
                e as unknown as SyntheticEvent<HTMLDialogElement, Event>,
              )
            }
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold text-zinc-100">
            {title}
          </h2>
        )}
        {
          // !Here better to have content and footer parts as compound components
          // !But in our codebase case not necessary
        }
        {children}
      </div>
    </dialog>
  );
};
