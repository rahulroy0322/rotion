import type { RegisterSchemaType } from 'schema/auth'
// TODO!
type CategoryType = {
  _id: string
  name: string
}

type AuthorType = {
  name: string
  avatar?: string
}

type ImageType = {
  url: string
  alt?: string
}

type BlogStatusType = 'draft' | 'published'

type BlogType = {
  _id: string
  title: string
  slug: string
  desc: string
  images: ImageType[]
  author: AuthorType
  categories: CategoryType[]
  time: Date
  status: BlogStatusType
}

type UserType = RegisterSchemaType & {
  _id: string
  role: 'user' | 'admin'
}

type SuccessType<T = Record<string, unknown>> = {
  success: true
  data: T
}

type ErrorType<E = Error> = {
  success: false
  error: E
}

type ResType<T = Record<string, unknown>> = SuccessType<T> | ErrorType

export type {
  CategoryType,
  BlogType,
  ImageType,
  BlogStatusType,
  UserType,
  ResType,
}
