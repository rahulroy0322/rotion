// TODO!
type CategoryType = {
  _id: string
  name: string
}

type UserType = {
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
  author: UserType
  categories: CategoryType[]
  time: Date
  status: BlogStatusType
}

export type { CategoryType, BlogType, ImageType, BlogStatusType }
