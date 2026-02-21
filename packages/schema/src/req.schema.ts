import { z } from 'zod'

const blogQuerySchema = z.object({
  limit: z.coerce.number().max(100).default(10),
  page: z.coerce.number().default(1),
  // lastId: z.string().nullable().default(null)
  // ? FOR CURSER based pagination
})

type BlogQuerySchemaType = z.infer<typeof blogQuerySchema>

export type { BlogQuerySchemaType }

export { blogQuerySchema }
