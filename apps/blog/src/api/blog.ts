import type { BlogType } from 'schema/blog'
import { BASE_URL } from '#/const/url'
import { getToken } from '#/lib/token'
import type { ResType } from '#/types'

const getBlogs = async () => {
  const token = getToken()
  const res = await fetch(`${BASE_URL}/blog`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
  })

  const _data = (await res.json()) as ResType<{
    blogs: BlogType[]
  }>

  if (!_data.success) {
    throw _data.error
  }

  return _data.data.blogs
}

export { getBlogs }
