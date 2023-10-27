import {
  ButtonHTMLAttributes,
  ImgHTMLAttributes,
  ReactHTMLElement,
} from "react";

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
} & ImgHTMLAttributes<HTMLImageElement>;
export function Avatar({
  src,
  alt,
  size = 30,
  className,
  ...props
}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
      className={`rounded-full object-cover ${className}`}
      {...props}
    />
  );
}
