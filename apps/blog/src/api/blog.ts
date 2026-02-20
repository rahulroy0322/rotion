import type { BlogType } from 'schema/blog'
import { BASE_URL } from '#/const/url'
import { getToken } from '#/lib/token'
import type { ResType } from '#/types'

const get = async <T>(route: string) => {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/${route}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  })

  return (await res.json()) as ResType<T>
}

const getBlogs = async () => {
  const data = await get<{
    blogs: BlogType[]
  }>('blog')

  if (!data.success) {
    throw data.error
  }

  return data.data.blogs
}

const getBlog = async (slug: string) =>
  await get<{
    blog: BlogType | null
  }>(`blog/${slug}`)

export { getBlogs, getBlog }
