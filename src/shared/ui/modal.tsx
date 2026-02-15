import { useDebouncedValue } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
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

const Modal = ({
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

  // TODO: This component is not fully accessible, need to improve it.
  // I don't use shadcn, that's why I keep custom components simple,
  // I prefer to use Custom components like modal to be like compound components, with props and children.
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
        className="relative flex max-h-[90vh] min-w-96 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-xl shadow-black/30"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
          {title && (
            <h2
              id="modal-title"
              className="pr-8 text-xl font-semibold leading-tight text-zinc-100"
            >
              {title}
            </h2>
          )}
          <Button
            variant="ghost"
            className="absolute right-3 top-3 rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            onClick={(e) =>
              closeHandler(
                e as unknown as SyntheticEvent<HTMLDialogElement, Event>,
              )
            }
            aria-label="Close"
          >
            <XIcon className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto p-6 pt-4">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
