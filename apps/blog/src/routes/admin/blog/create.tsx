import { createFileRoute, useRouteContext } from '@tanstack/react-router'

import type { FC } from 'react'

import { BlogForm } from '#/components/editor/main'

const CreateBlogPage: FC = () => {
  const { client } = useRouteContext({
    from: '/admin/blog/create',
  })

  return <BlogForm client={client} />
}

const Route = createFileRoute('/admin/blog/create')({
  component: CreateBlogPage,
})

export { Route }
