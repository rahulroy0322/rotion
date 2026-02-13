import { Carousel, CarouselContent, CarouselIndicators, CarouselItem } from "ui/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { timeFormat } from "#/utils/time"
import type { BlogType, CategoryType } from "#/types"
import type { ComponentProps, FC } from "react"
import { cn } from "ui/lib/utils"
import { Badge } from "ui/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "ui/ui/avatar"
import { UserCircleIcon } from "@phosphor-icons/react"


type HeroPropsType = {
    title: string
    desc: string

    heroImage: string
    alt?: string

    name: string
    avatarUrl?: string

    categories: CategoryType[]
    time: Date
} & ComponentProps<'article'>

const Hero: FC<HeroPropsType> = ({
    title,
    desc,
    heroImage,
    alt = title,
    name,
    avatarUrl,
    categories,
    className,
    time,
    ...props
}) => <article {...props} className={cn("size-full relative overflow-hidden isolate flex gap-6 items-end p-2", className)}>
        <figure className="absolute inset-0 -z-10 before:bg-gray-500/60 before:absolute before:inset-0">
            <img
                src={heroImage}
                alt={alt}
            />
        </figure>
        <div className="flex flex-col gap-1 basis-1/2">
            <div className="flex gap-1">
                {
                    categories.map(({
                        name,
                        _id
                    }) =>
                        <Badge className="px-1 text-sm" variant={_id === 'count-more' ? 'outline' : undefined} key={_id}>
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
                    timeFormat(
                        time
                    )
                }
            </time>
        </div>
    </article>


const carouselPlugins = [Autoplay({
    delay: 2000,
}),
]
type HomePageHeroSectionPropsType = {
    topBlogs: BlogType[]
}

const HomePageHeroSection: FC<HomePageHeroSectionPropsType> = ({
    topBlogs
}) => <Carousel className="relative"
    opts={{
        loop: true,
    }}
    plugins={carouselPlugins}
>
        <CarouselContent className="aspect-video md:aspect-20/9 lg:aspect-10/3">
            {
                topBlogs.map(({
                    _id,
                    title,
                    desc,
                    images,
                    author: {
                        avatar,
                        name
                    },
                    categories,
                    time
                }) => {

                    const renderAbleCateries = [...categories]
                    if (categories.length > 5) {
                        renderAbleCateries.splice(4)
                        const count = categories.length - 4
                        renderAbleCateries.push({
                            _id: 'count-more',
                            name: `${count}+`
                        })
                    }

                    return <CarouselItem className="basis-full shrink-0" key={_id}>
                        <Hero
                            className="pb-7"
                            title={title}
                            desc={desc}
                            heroImage={images[0].url}
                            alt={
                                images[0].alt
                            }
                            name={
                                name
                            }
                            avatarUrl={
                                avatar
                            }
                            categories={renderAbleCateries}
                            time={time}
                        />
                    </CarouselItem>
                }
                )
            }
        </CarouselContent>
        <CarouselIndicators
            className="absolute bottom-2 left-2" />
    </Carousel>

export {
    HomePageHeroSection
}