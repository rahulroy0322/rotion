import type { ComponentProps, FC } from 'react'

type ImagePropsType = {
  src: string
  alt: string
} & ComponentProps<'figure'>

const Image: FC<ImagePropsType> = ({ src, alt, ...props }) => (
  <figure {...props}>
    <img
      alt={alt}
      className="size-full object-cover"
      src={src}
    />
  </figure>
)
export { Image }
