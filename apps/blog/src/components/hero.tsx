import type { FC } from "react";
import { Badge } from "ui/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "ui/ui/avatar"
import { UserCircleIcon } from "@phosphor-icons/react";
import type { CategoryType } from "#/types";

const time = new Date()

const { format } = Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
})

type HeroPropsType = {
    title: string
    desc: string

    heroImage: string
    alt?: string

    name: string
    avatarUrl?: string

    categories: CategoryType[]
}

const Hero: FC<HeroPropsType> = ({
    title,
    desc,
    heroImage,
    alt = title,
    name,
    avatarUrl,
    categories
}) => <article className="aspect-video md:aspect-20/9 lg:aspect-10/3 w-screen relative isolate p-2 flex gap-6 items-end pb-7">
        <figure className="absolute inset-0 -z-10 before:bg-gray-500/60 before:absolute before:inset-0">
            <img
                src={heroImage}
                className="object-cover"
                alt={alt}
            />
        </figure>
        <div className="flex flex-col gap-1 basis-1/2">
            <div>
                {
                    categories.map(({
                        name,
                        _id
                    }) =>
                        <Badge key={_id}>
                            {name}
                        </Badge>
                    )
                }
            </div>
            <h2 className="line-clamp-1 font-semibold font-mono">
                {title}
            </h2>
            <p className="line-clamp-2">
                {desc}
            </p>
        </div>
        <div className="text-end w-fit ml-auto">
            <div className="flex gap-2 items-center">
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
            </div>
            <time className="text-muted text-sm" dateTime={time.toString()}>
                {
                    format(
                        time
                    )
                }
            </time>
        </div>
    </article>


export { Hero }