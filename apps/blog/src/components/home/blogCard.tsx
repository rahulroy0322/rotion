
import { timeFormat } from "#/utils/time"
import { Link } from "@tanstack/react-router"
import type { FC } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "ui/ui/card"
import { Image } from "#/components/image"
import { Avatar } from "#/components/avatar"

type BlogCardPropsType = {
    title: string
    slug: string
    desc: string

    heroImage: string
    alt?: string

    name: string
    avatarUrl?: string

    time: Date
}

const BlogCard: FC<BlogCardPropsType> = ({
    time,
    title,
    slug,
    heroImage,
    name,
    desc,
    avatarUrl,
    alt = title
}) => <article>
        <Card className="shadow shadow-primary/80 pt-0">
            <CardHeader className="p-0">
                <Link to="/blog/$slug" params={{
                    slug
                }}>
                    <Image
                        className="aspect-video"
                        src={
                            heroImage
                        }
                        alt={alt}
                    />
                </Link>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
                <time dateTime={time.toString()}
                    className="text-sm text-muted-foreground"
                >{
                        timeFormat(time)}</time>
                <Link to="/blog/$slug" params={{
                    slug
                }}>
                    <h2 className="font-semibold line-clamp-2 text-balance text-lg leading-tight">
                        {title}
                    </h2>
                </Link>
                <h3 className="font-light text-secondary-foreground leading-4 line-clamp-2">
                    {desc}
                </h3>
            </CardContent>

            <CardFooter className="ring py-2">
                <Link className="flex gap-2 items-end" to="/">
                    <Avatar src={avatarUrl} alt={name} className="size-8" />
                    <h3 className="font-bold text-lg">
                        {name}
                    </h3>
                </Link>
            </CardFooter>
        </Card>
    </article>

export { BlogCard }