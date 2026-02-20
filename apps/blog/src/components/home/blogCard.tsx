import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from 'ui/ui/card'
import { Skeleton } from 'ui/ui/skeleton'
import { Avatar } from '#/components/avatar'
import { Image } from '#/components/image'
import { timeFormat } from '#/utils/time'

type BlogCardPropsType = {
  title: string
  slug: string
  desc: string

  heroImage: string
  alt?: string

  name: string
  avatarUrl?: string

  time: string
}

const BlogCard: FC<BlogCardPropsType> = ({
  time,
  title,
  slug,
  heroImage,
  name,
  desc,
  avatarUrl,
  alt = title,
}) => (
  <article>
    <Card className="shadow shadow-primary/80 pt-0">
      <CardHeader className="p-0">
        <Link
          params={{
            slug,
          }}
          to="/blog/$slug"
        >
          <Image
            alt={alt}
            className="aspect-video"
            src={heroImage}
          />
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <time
          className="text-sm text-muted-foreground"
          dateTime={time.toString()}
        >
          {timeFormat(time)}
        </time>
        <Link
          params={{
            slug,
          }}
          to="/blog/$slug"
        >
          <h2 className="font-semibold line-clamp-2 text-balance text-lg leading-tight">
            {title}
          </h2>
        </Link>
        <h3 className="font-light text-secondary-foreground leading-4 line-clamp-2">
          {desc}
        </h3>
      </CardContent>

      <CardFooter className="ring py-2">
        <Link
          className="flex gap-2 items-end"
          to="/"
        >
          <Avatar
            alt={name}
            className="size-8"
            src={avatarUrl}
          />
          <h3 className="font-bold text-lg">{name}</h3>
        </Link>
      </CardFooter>
    </Card>
  </article>
)

const BlogCardSkeleton: FC = () => (
  <article>
    <Card className="shadow shadow-primary/80 pt-0">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video outline outline-primary" />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-3 w-90" />

        <Skeleton className="h-3 w-90" />
        <Skeleton className="h-3 w-40" />
      </CardContent>

      <CardFooter className="ring py-2">
        <div className="flex gap-2 items-end">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardFooter>
    </Card>
  </article>
)

export { BlogCard, BlogCardSkeleton }
