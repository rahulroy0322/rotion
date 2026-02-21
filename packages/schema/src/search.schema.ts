import { z } from 'zod'

const blogsSearchSchema = z.object({
  limit: z.preprocess((val) => {
    const num = Number(val)
    return isNaN(num) ? undefined : num
  }, z.number().min(5).max(100).default(10)),
  page: z.preprocess((val) => {
    const num = Number(val)
    return isNaN(num) ? undefined : num
  }, z.number().min(1).default(1)),
})

type BlogsSearchType = z.infer<typeof blogsSearchSchema>

export type { BlogsSearchType }

export { blogsSearchSchema }
