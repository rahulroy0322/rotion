
import { timeFormat } from "#/utils/time"
import { UserCircleIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import type { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "ui/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "ui/ui/card"

type BlogCardPropsType = {
    title: string
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
    heroImage,
    name,
    desc,
    avatarUrl,
    alt = title
}) => <article>
        <Card className="shadow shadow-primary/80 pt-0">
            <CardHeader className="p-0">
                <Link to="/">
                    <figure className="aspect-video">
                        <img
                            src={
                                heroImage
                            }
                            className="size-full object-cover"
                            alt={alt}
                        />
                    </figure>
                </Link>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
                <time dateTime={time.toString()}
                    className="text-sm text-muted-foreground"
                >{
                        timeFormat(time)}</time>
                <Link to='/'>
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
                <Avatar className="size-8">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>
                        <UserCircleIcon
                            className="size-full"
                        />
                    </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg">
                    {name}
                </h3>
                                </Link>
            </CardFooter>
        </Card>
    </article>

export { BlogCard }