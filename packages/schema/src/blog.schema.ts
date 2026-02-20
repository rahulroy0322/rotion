import { z } from 'zod'

const blogStatus = ['draft', 'published'] as const

const blogSchema = z.object({
  title: z.string('Title is required').min(1, 'Title is required'),
  slug: z.string('Slug is required').min(1, 'Slug is required'),
  content: z.string('Content is required').min(1, 'Content is required'),
  //images: ImageType[]
  //  author: UserType
  //     categories: CategoryType[]
  time: z
    .string()
    .default(() => new Date().toDateString())
    .transform((v) => v || undefined),
  status: z.enum(blogStatus).default('draft'),
})

type BlogStatusType = (typeof blogStatus)[number]
type BlogSchemaType = z.infer<typeof blogSchema>

type BlogType = {
  _id: string
} & BlogSchemaType
export type { BlogSchemaType, BlogType, BlogStatusType }

export { blogSchema, blogStatus }
