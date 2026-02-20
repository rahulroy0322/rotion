import { model, Schema } from 'mongoose'
import { type BlogSchemaType, blogStatus } from 'schema/blog'

const BlogSchema = new Schema<BlogSchemaType>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: blogStatus,
      default: 'draft',
    },
    time: {
      type: String,
      required: true,
      default: new Date().toDateString(),
    },
  },
  {
    timestamps: true,
  }
)

const Blog = model<BlogSchemaType>('Blog', BlogSchema)

export { Blog }
