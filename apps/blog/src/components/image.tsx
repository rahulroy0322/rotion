import type { ComponentProps, FC } from "react"

type ImagePropsType = {
    src: string
    alt: string
} & ComponentProps<'figure'>

const Image: FC<ImagePropsType> = ({
    src,
    alt,
    ...props
}) => <figure {...props}>
        <img
            src={
                src
            }
            className="size-full object-cover"
            alt={alt}
        />
    </figure>
export { Image }