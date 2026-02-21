import type { RequestHandler } from 'express'
import { blogDeleteReqSchema, blogSchema, blogUpdateSchema } from 'schema/blog'
import { blogQuerySchema } from 'schema/req'
import { adminRoles, type RoleType } from 'schema/role'
import type { ResType } from '../@types/res'
import {
  ConflictError,
  ForbidenError,
  NotFoundError,
  ServerError,
  ZodError,
} from '../error/app.error'
import {
  countBlogs,
  createBlog,
  deleteBlogs,
  findBlog,
  getAllBlogs,
  updateBlog,
} from '../services/blog'

const getPublishedBlogsController: RequestHandler = async (req, res) => {
  const parsed = blogQuerySchema.safeParse(req.query || req.body || {})

  if (!parsed.success) {
    throw new ZodError(parsed.error)
  }

  let filter: Parameters<typeof getAllBlogs>[0] = {
    status: 'published',
  }

  if (req.user) {
    if ((adminRoles as RoleType[]).includes(req.user.role)) {
      filter = {}
    }
  }

  const { limit, page } = parsed.data

  const skip = Math.max(limit * (page - 1), 0)

  const [blogs, total = 0] = await Promise.all([
    getAllBlogs(filter, {
      limit,
      skip,
    }),
    countBlogs(filter),
  ])

  res.status(200).json({
    success: true,
    data: {
      blogs,
      items: {
        total,
        current: blogs.length,
        pages: Math.ceil(total / limit),
      },
    },
  } satisfies ResType)
}

const getPublishedBlogBySlugController: RequestHandler<{
  slug: string
}> = async (req, res) => {
  const blog = await findBlog({
    slug: req.params.slug,
  })

  if (!blog) {
    throw new NotFoundError('Blog Not Found')
  }

  if (blog.status === 'draft') {
    const user = req.user

    if (!user || !adminRoles.includes(user.role)) {
      throw new NotFoundError('Blog Not Published yet')
    }
  }

  res.status(200).json({
    success: true,
    data: {
      blog,
    },
  } satisfies ResType)
}

const createBlogController: RequestHandler = async (req, res) => {
  const user = req.user
  if (!user) {
    throw new ServerError("some event dosn't handled properly!")
  }

  const parsed = blogSchema.safeParse(req.body || {})

  if (!parsed.success) {
    throw new ZodError(parsed.error)
  }

  // TODO! check for admin

  const { data } = parsed

  const existsBlog = await findBlog({
    $or: [
      {
        title: data.title,
      },
      {
        slug: data.slug,
      },
    ],
  })

  if (existsBlog) {
    throw new ConflictError('blog already exists!')
  }

  // TODo! ADD  author
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

const updateBlogController: RequestHandler<{
  slug: string
}> = async (req, res) => {
  const user = req.user
  if (!user) {
    throw new ServerError("some event dosn't handled properly!")
  }

  const parsed = blogUpdateSchema.safeParse(req.body || {})

  if (!parsed.success) {
    throw new ZodError(parsed.error)
  }
  const { slug } = req.params

  // TODO! check for admin

  const { data } = parsed

  // TODo! ADD  author
  //! check  for author
  const blog = await updateBlog(
    {
      slug,
    },
    data
  )

  if (!blog) {
    throw new ForbidenError()
  }

  res.status(200).json({
    success: true,
    data: {
      blog,
    },
  } satisfies ResType)
}

const deleteBlogsController: RequestHandler = async (req, res) => {
  const user = req.user
  if (!user) {
    throw new ServerError("some event dosn't handled properly!")
  }

  const parsed = blogDeleteReqSchema.safeParse(req.body || {})

  if (!parsed.success) {
    throw new ZodError(parsed.error)
  }

  const { data } = parsed

  // TODo! check permission

  await deleteBlogs({
    _id: {
      $in: data.ids,
    },
  })

  res.status(200).json({
    success: true,
    data: {
      messgae: 'deleted successfully',
    },
  } satisfies ResType)
}

export {
  getPublishedBlogsController,
  createBlogController,
  getPublishedBlogBySlugController,
  updateBlogController,
  deleteBlogsController,
}
