import type { BlogSchemaType, BlogType, blogDeleteReqSchema } from 'schema/blog'
import type { z } from 'zod'
import { BASE_URL } from '#/const/url'
import { getToken } from '#/lib/token'
import type { ResType } from '#/types'

type MethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

const req = async <T>(
  route: string,
  method: MethodType = 'GET',
  body?: string
) => {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/${route}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    body,
  })

  return (await res.json()) as ResType<T>
}

const get = async <T>(route: string) => await req<T>(route)

const post = async <T>(route: string, body: Partial<BlogType>) =>
  await req<T>(route, 'POST', JSON.stringify(body))

const patch = async <T>(route: string, body: Partial<BlogType>) =>
  await req<T>(route, 'PATCH', JSON.stringify(body))

const destroy = async <T>(route: string, body: unknown) =>
  await req<T>(route, 'DELETE', JSON.stringify(body))

const getBlogs = async (
  { limit, page } = {
    limit: 10,
    page: 1,
  }
) => {
  const data = await get<{
    blogs: BlogType[]
    items: {
      total: number
      current: number
      pages: number
    }
  }>(`blog?limit=${limit}&page=${page}`)

  if (!data.success) {
    throw data.error
  }

  return data.data
}

const createBlog = async (blog: BlogSchemaType) => {
  const data = await post<{
    blog: BlogType | null
  }>('blog', blog)

  if (!data.success) {
    throw data.error
  }

  return data.data.blog
}

const updateBlog = async (id: string, blog: BlogSchemaType) => {
  const data = await patch<{
    blog: BlogType | null
  }>(`blog/${id}`, blog)

  if (!data.success) {
    throw data.error
  }

  return data.data.blog
}

const getBlog = async (slug: string) =>
  await get<{
    blog: BlogType | null
  }>(`blog/${slug}`)

const deleteBlogs = async (data: z.infer<typeof blogDeleteReqSchema>) => {
  const res = await destroy<{
    messgae: string
  }>(`blog`, data)

  if (!res.success) {
    throw res.error
  }

  return res.data.messgae
}

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlogs }
