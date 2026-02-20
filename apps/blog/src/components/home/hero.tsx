import Autoplay from 'embla-carousel-autoplay'
import type { ComponentProps, FC } from 'react'
import type { BlogType } from 'schema/blog'
import { cn } from 'ui/lib/utils'
import { Badge } from 'ui/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
} from 'ui/ui/carousel'
import { Skeleton } from 'ui/ui/skeleton'
import { Avatar } from '#/components/avatar'
import { Image } from '#/components/image'
import type { CategoryType } from '#/types'
import { timeFormat } from '#/utils/time'

type HeroPropsType = {
  title: string
  desc: string

  heroImage: string
  alt?: string

  name: string
  avatarUrl?: string

  categories: CategoryType[]
  time: string
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
}) => (
  <article
    {...props}
    className={cn(
      'size-full relative overflow-hidden isolate flex gap-6 items-end p-2',
      className
    )}
  >
    <Image
      alt={alt}
      className="absolute inset-0 -z-10 before:bg-gray-500/60 before:absolute before:inset-0"
      src={heroImage}
    />
    <div className="flex flex-col gap-1 basis-1/2">
      <div className="flex gap-1">
        {categories.map(({ name, _id }) => (
          <Badge
            className="px-1 text-sm"
            key={_id}
            variant={_id === 'count-more' ? 'outline' : undefined}
          >
            {name}
          </Badge>
        ))}
      </div>
      <h2 className="line-clamp-1 font-semibold font-mono">{title}</h2>
      <p className="line-clamp-2">{desc}</p>
    </div>
    <div className="text-end w-fit ml-auto">
      <div className="flex gap-2 items-center">
        <Avatar
          alt={name}
          src={avatarUrl}
        />
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <time
        className="text-muted text-sm"
        dateTime={time.toString()}
      >
        {timeFormat(new Date(time))}
      </time>
    </div>
  </article>
)

const HeroSkeleton: FC<{
  className: string
}> = ({ className }) => (
  <article
    className={cn(
      'size-full relative overflow-hidden isolate flex gap-6 items-end p-2',
      className
    )}
  >
    <Skeleton className="absolute inset-0 -z-10 before:bg-gray-500/60 before:absolute before:inset-0" />

    <div className="flex flex-col gap-1 basis-1/2">
      <div className="flex gap-1">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-55" />
    </div>

    <div className="text-end w-fit ml-auto">
      <div className="flex gap-2 items-center">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-3 w-20 ml-auto" />
    </div>
  </article>
)

const carouselPlugins = [
  Autoplay({
    delay: 2000,
  }),
]
type HomePageHeroSectionPropsType = {
  topBlogs: BlogType[]
}

// TODo!
const categories = [
  {
    _id: '1',
    name: 'web dev',
  },
  {
    _id: '2',
    name: 'basic',
  },
  {
    _id: '3',
    name: 'web dev',
  },
  {
    _id: '4',
    name: 'basic',
  },
  {
    _id: '5',
    name: 'basic',
  },
] as const satisfies CategoryType[]

const HomePageHeroSection: FC<HomePageHeroSectionPropsType> = ({
  topBlogs,
}) => (
  <Carousel
    className="relative"
    opts={{
      loop: true,
    }}
    plugins={carouselPlugins}
  >
    <CarouselContent className="aspect-video md:aspect-20/9 lg:aspect-10/3">
      {topBlogs.map(
        ({
          title,
          // con,
          // images,
          // author: { avatar, name },
          // categories,
          // content,
          slug,
          // status,
          time,
        }) => {
          const renderAbleCateries = [...categories] as CategoryType[]
          if (categories.length > 5) {
            renderAbleCateries.splice(4)
            const count = categories.length - 4
            renderAbleCateries.push({
              _id: 'count-more',
              name: `${count}+`,
            })
          }

          return (
            <CarouselItem
              className="basis-full shrink-0"
              key={slug}
            >
              <Hero
                // alt={images[0].alt}
                // avatarUrl={avatar}
                avatarUrl={'/avatar.webp'}
                categories={renderAbleCateries}
                className="pb-7"
                desc={'lorem'}
                // heroImage={images[0].url}
                heroImage="/write.jpg"
                // name={name}
                name="nxa"
                time={time}
                title={title}
              />
            </CarouselItem>
          )
        }
      )}
    </CarouselContent>
    <CarouselIndicators className="absolute bottom-2 left-2" />
  </Carousel>
)

const HomePageHeroSectionSkeleton: FC = () => (
  <Carousel
    className="relative"
    opts={{
      loop: true,
    }}
    plugins={carouselPlugins}
  >
    <CarouselContent className="aspect-video md:aspect-20/9 lg:aspect-10/3">
      {Array.from(
        {
          length: 3,
        },
        (_, i) => (
          <CarouselItem
            className="basis-full shrink-0"
            key={i.toString()}
          >
            <HeroSkeleton className="pb-7" />
          </CarouselItem>
        )
      )}
    </CarouselContent>
    <CarouselIndicators className="absolute bottom-2 left-2" />
  </Carousel>
)

export { HomePageHeroSection, HomePageHeroSectionSkeleton }
