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

type BlogType = {
    _id: string
    title: string
    slug: string
    desc: string
    images: ImageType[]
    author: UserType
    categories: CategoryType[]
    time: Date
}

export type {
    CategoryType,
    BlogType,
    ImageType
}