import type { RequestHandler } from 'express'
import { blogSchema } from 'schema/blog'
import type { ResType } from '../@types/res'
import { ConflictError, ServerError, ZodError } from '../error/app.error'
import { createBlog, findBlog, getAllBlogs } from '../services/blog'

const getPublishedBlogsController: RequestHandler = async (_req, res) => {
  const blogs =
    (await getAllBlogs({
      status: 'published',
    })) || []

  res.status(200).json({
    success: true,
    data: {
      blogs,
    },
  } satisfies ResType)
}

const createBlogController: RequestHandler = async (req, res) => {
  const parsed = blogSchema.safeParse(req.body || {})

  if (!parsed.success) {
    throw new ZodError(parsed.error)
  }

  // TODO! check for admin

  const { data } = parsed

  const existsBlog = await findBlog({
    $or: [
      {
        title: data.time,
      },
      {
        slug: data.slug,
      },
    ],
  })

  if (existsBlog) {
    throw new ConflictError('blog already exists!')
  }

  const blog = await createBlog(data)

  if (!blog) {
    throw new ServerError()
  }

  res.status(201).json({
    success: true,
    data: {
      blog,
    },
  } satisfies ResType)
}

export { getPublishedBlogsController, createBlogController }
