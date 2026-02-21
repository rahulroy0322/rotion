import {
  createFileRoute,
  redirect,
  useLoaderData,
  useRouteContext,
} from '@tanstack/react-router'
import type { FC } from 'react'
import { getBlog } from '#/api/blog'
import { BlogForm } from '#/components/editor/main'
import { KEYS } from '#/keys/query'
import { toast } from '@/components/ui/sonner'

const EditPage: FC = () => {
  const { client } = useRouteContext({
    from: '/admin/blog/edit/$slug',
  })

  const blog = useLoaderData({
    from: '/admin/blog/edit/$slug',
  })

  return (
    <BlogForm
      blog={blog}
      client={client}
    />
  )
}

const Route = createFileRoute('/admin/blog/edit/$slug')({
  component: EditPage,
  loader: async ({ params: { slug }, context: { client } }) => {
    const res = await client.fetchQuery({
      queryKey: [...KEYS.blog, slug],
      queryFn: () => getBlog(slug),
    })

    if ('error' in res) {
      toast.error(`Error: ${res.error.message || res.error.toString()}`)

      throw redirect({
        to: '/admin',
      })
    }
    const { blog } = res.data

    if (!blog) {
      toast.error(`Error: "blog" is not defined!`)
      throw redirect({
        to: '/admin',
      })
    }

    return blog
  },
})

export { Route }
