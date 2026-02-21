import type { BlogSchemaType, BlogType } from 'schema/blog'
import { BASE_URL } from '#/const/url'
import { getToken } from '#/lib/token'
import type { ResType } from '#/types'

type MethodType = 'GET' | 'POST' | 'PATCH'

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

const getBlogs = async () => {
  const data = await get<{
    blogs: BlogType[]
  }>('blog')

  if (!data.success) {
    throw data.error
  }

  return data.data.blogs
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

export { getBlogs, getBlog, createBlog, updateBlog }
