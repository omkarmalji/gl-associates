import type { CSSProperties, ImgHTMLAttributes } from "react";
import type { ProjectImage } from "../data";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> & {
  image: ProjectImage;
  eager?: boolean;
};

export function ResponsiveImage({ image, eager = false, className = "", ...props }: ResponsiveImageProps) {
  const style = {
    objectPosition: image.position,
    objectFit: image.contain ? "contain" : "cover",
    ...(props.style ?? {}),
  } as CSSProperties;

  return (
    <img
      {...props}
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes="100vw"
      alt={image.alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      style={style}
    />
  );
}
