import {
  createFileRoute,
  Link,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import { type FC, useMemo, useState } from 'react'
import type { BlogStatusType, BlogType } from 'schema/blog'
import { Input } from 'ui/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/ui/select'
import { getBlogs } from '#/api/blog'
import { Image } from '#/components/image'
import { timeFormat } from '#/utils/time'
import { toast } from '@/components/ui/sonner'

type BlogStatus = BlogStatusType | 'all'

type ManagePageImplPropsType = {
  blogs: BlogType[]
}

const ManagePageImpl: FC<ManagePageImplPropsType> = ({ blogs }) => {
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
          {filterBlogs.map(
            ({
              //images,
              title,
              time,
              slug,
            }) => (
              <li key={slug}>
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
                    // alt={images[0].alt || title}
                    alt=""
                    className="size-24"
                    src={'/write.jpg'}
                  />
                  <div>
                    <h2 className="text-lg font-bold">{title}</h2>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={time.toString()}
                    >
                      {timeFormat(time)}
                    </time>
                  </div>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

const ManagePage: FC = () => {
  const blogs = useLoaderData({
    from: '/admin/blog/manage',
  })

  return <ManagePageImpl blogs={blogs} />
}

const Route = createFileRoute('/admin/blog/manage')({
  component: ManagePage,
  loader: async ({ context: { client } }) => {
    try {
      return await client.fetchQuery({
        queryKey: ['tournaments'],
        queryFn: getBlogs,
      })
    } catch (e) {
      toast.error(`Error: fetching blogs ${(e as Error).toString()}`)
      throw redirect({
        href: '/',
      })
    }
  },
})

export { Route }
