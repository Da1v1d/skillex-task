import { cn } from "@/shared/lib/utils";
import { useState, useCallback, type ComponentProps } from "react";

type ImageProps = ComponentProps<"img"> & {
  fallbackSrc?: string;
  className?: string;
};

const Image = ({
  src,
  fallbackSrc = "https://placehold.net/4-800x600.png",
  alt = "",
  className = "",
  onError,
  ...rest
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (hasError) return;

      setHasError(true);
      onError?.(e);
    },
    [hasError, onError],
  );

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
};

export default Image;
