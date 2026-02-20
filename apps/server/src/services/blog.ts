import type { QueryFilter } from 'mongoose'
import type { BlogSchemaType, BlogStatusType, BlogType } from 'schema/blog'
import { Blog } from '../models/blog.model'

const getAllBlogs = (
  filter: {
    status?: BlogStatusType
  },
  { limit } = {
    limit: 10,
  }
) => Blog.find(filter).limit(limit)

const findBlog = (filter: QueryFilter<BlogType>) =>
  Blog.findOne(filter as QueryFilter<BlogSchemaType>)

const createBlog = (data: BlogSchemaType) => Blog.create(data)

export { getAllBlogs, findBlog, createBlog }
