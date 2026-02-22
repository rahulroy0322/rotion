import type { QueryFilter } from 'mongoose'
import type { BlogSchemaType, BlogStatusType, BlogType } from 'schema/blog'
import { Blog } from '../models/blog.model'

const getAllBlogs = (
  filter: {
    status?: BlogStatusType
  },
  { limit, skip } = {
    limit: 10,
    skip: 0,
  }
) =>
  Blog.find(filter)
    .sort({
      updatedAt: 'desc',
    })
    .limit(limit)
    .skip(skip)

const findBlog = (filter: QueryFilter<BlogType>) =>
  Blog.findOne(filter as QueryFilter<BlogSchemaType>)

const createBlog = (data: BlogSchemaType) => Blog.create(data)

const updateBlog = (
  filter: QueryFilter<BlogType>,
  data: Partial<BlogSchemaType>
) =>
  Blog.findOneAndUpdate(filter as QueryFilter<BlogSchemaType>, data, {
    new: true,
  })

const deleteBlogs = (filter: QueryFilter<BlogType>) =>
  Blog.deleteMany(filter as QueryFilter<BlogSchemaType>)

const countBlogs = (filter: QueryFilter<BlogType>) =>
  Blog.countDocuments(filter as QueryFilter<BlogSchemaType>)

export {
  getAllBlogs,
  findBlog,
  createBlog,
  updateBlog,
  deleteBlogs,
  countBlogs,
}
