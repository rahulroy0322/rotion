import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Input } from 'ui/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/ui/select'
import { Image } from '#/components/image'
import type { BlogStatusType, BlogType, CategoryType } from '#/types'
import { timeFormat } from '#/utils/time'

type BlogStatus = BlogStatusType | 'all'

const Route = createFileRoute('/admin/blog/manage')({
  component: RouteComponent,
})

const desc =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quidem consequatur est quaerat exercitationem officiis at itaque vero totam odio possimus placeat ut explicabo distinctio id'

const time = new Date()

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

const blogs = [
  {
    _id: '1',
    title: "Let's learn js basic.",
    slug: 'let-learn-js-basic',
    desc,
    images: [
      {
        url: '/write.jpg',
      },
    ],
    author: {
      name: 'Author Name',
      avatar: '/avatar.webp',
    },
    time,
    categories,
    status: 'draft',
  },
  {
    _id: '2',
    title: "Let's learn ts basic.",
    slug: 'let-learn-ts-basic',
    desc,
    images: [
      {
        url: '/avatar.webp',
      },
    ],
    author: {
      name: 'Author Name',
      avatar: '/write.jpg',
    },
    time,
    categories,
    status: 'published',
  },
] as BlogType[] satisfies BlogType[]

function RouteComponent() {
  const [filterBlogs, setFilterBlogs] = useState(blogs)

  const { all, draft, published } = useMemo(() => {
    return {
      all: filterBlogs,
      draft: filterBlogs.filter(({ status }) => status === 'draft'),
      published: filterBlogs.filter(({ status }) => status === 'published'),
    } satisfies Record<BlogStatus, BlogType[]>
  }, [filterBlogs])

  const handelSelect = (value: BlogStatus) => {
    if (value === 'all') {
      setFilterBlogs(blogs)
    } else {
      setFilterBlogs(blogs.filter(({ status }) => status === value))
    }
  }

  const handelSearch = (value: string) => {
    setFilterBlogs(
      blogs.filter(
        ({ title, slug }) => title.includes(value) || slug.includes(value)
      )
    )
  }

  return (
    <div className="grow overflow-hidden container mx-auto p-4 flex flex-col gap-2">
      <div className="flex items-center justify-baseline gap-2">
        <Select
          defaultValue={'all' satisfies BlogStatus}
          onValueChange={(value) => handelSelect(value as BlogStatus)}
        >
          <SelectTrigger>
            <SelectValue
              className={'capitalize'}
              placeholder="Select"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'all' satisfies BlogStatus}>
              All ({all.length})
            </SelectItem>
            <SelectItem value={'draft' satisfies BlogStatus}>
              Draft ({draft.length})
            </SelectItem>
            <SelectItem value={'published' satisfies BlogStatus}>
              Published ({published.length})
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Input
            className="min-w-[35ch]"
            onChange={(e) => handelSearch(e.target.value.trim())}
            placeholder="Search blog"
          />
        </div>
      </div>

      <div className="overflow-auto grow">
        <ul className="space-y-2">
          {filterBlogs.map(({ _id, images, title, time, slug }) => (
            <li key={_id}>
              {/* 
                  // TODO!
                    */}
              <Link
                className="flex items-end gap-2"
                params={{
                  slug,
                }}
                to="/blog/$slug"
              >
                <Image
                  alt={images[0].alt || title}
                  className="size-24"
                  src={images[0].url}
                />
                <div>
                  <h2>{title}</h2>
                  <time dateTime={time.toString()}>{timeFormat(time)}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export { Route }
