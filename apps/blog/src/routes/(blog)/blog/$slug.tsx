import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type FC, Suspense, useState } from 'react'
import { Button } from 'ui/ui/button'
import { Skeleton } from 'ui/ui/skeleton'
import { toast } from 'ui/ui/sonner'
import { getBlog } from '#/api/blog'
import { Image } from '#/components/image'
import { Main } from '#/components/main'
import type { ImageType } from '#/types'
import '#/components/editor/editor.css'
import { KEYS } from '#/keys/query'

const images = [
  {
    url: '/write.jpg',
  },
  {
    url: '/write.jpg',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/write.jpg',
  },
  {
    url: '/avatar.webp',
  },
  {
    url: '/write.jpg',
  },
] as ImageType[] satisfies ImageType[]

type BlogPageImagesPropsType = {
  images: ImageType[]
  slug: string
}

const BlogPageImages: FC<BlogPageImagesPropsType> = ({ slug, images }) => {
  const [selectedImage, setSelectedImage] = useState(images.at(0))

  if (!selectedImage) {
    return null
  }

  return (
    <div className="space-y-2 overflow-hidden">
      <Image
        alt={selectedImage.alt || slug}
        className="aspect-video md:aspect-20/9 lg:aspect-10/3"
        src={selectedImage.url}
      />

      <div className="flex gap-2 overflow-auto pb-3 scroll-smooth items-center mx-auto max-w-full w-fit px-1">
        {images.map(({ url, alt = slug }) => (
          <Button
            aria-label={`See ${alt}`}
            className="aspect-video h-20 w-auto p-0 cursor-pointer"
            key={`${alt}-${url}`}
            onClick={() =>
              setSelectedImage({
                url,
                alt,
              })
            }
            render={
              <Image
                alt={alt}
                src={url}
              />
            }
            variant="ghost"
          />
        ))}
      </div>
    </div>
  )
}

type BlogPageContentPropsType = {
  content: string
}

const extensions = [TextStyleKit, StarterKit]

const BlogPageContent: FC<BlogPageContentPropsType> = ({ content }) => {
  const editor = useEditor({
    extensions,
    editable: false,
    content,
  })
  return (
    <div className="prose container mx-auto">
      <EditorContent editor={editor} />
    </div>
  )
}

const BlogPageImpl: FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { data: blog } = useSuspenseQuery({
    queryKey: [...KEYS.blog, slug],
    queryFn: () => getBlog(slug),
  })

  if ('error' in blog) {
    toast.error(`Error: ${blog.error.message || blog.error.toString()}`)

    return navigate({
      to: '/',
    }) as never
  }

  if (!blog.data.blog) {
    toast.error(`Error: Blog Not Found with this slug`, {
      description: slug,
    })

    return navigate({
      to: '/',
    }) as never
  }

  const { content, title } = blog.data.blog

  return (
    <Main className="p-2">
      <BlogPageImages
        images={images}
        slug={slug}
      />
      <h1 className="text-3xl font-bold">{title}</h1>
      <BlogPageContent content={content} />
    </Main>
  )
}

const BlogPage: FC = () => (
  <Suspense
    fallback={
      <Main className="p-2">
        <Skeleton className="aspect-video md:aspect-20/9 lg:aspect-10/3" />
        <Skeleton className="w-full h-8 mt-2" />
        <Skeleton className="w-full h-4 mt-1" />
        <Skeleton className="w-full h-4 mt-1" />{' '}
        <Skeleton className="w-full h-4 mt-1" />{' '}
        <Skeleton className="w-full h-4 mt-1" />
        <Skeleton className="w-1/122 h-4 mt-1" />
      </Main>
    }
  >
    <BlogPageImpl />
  </Suspense>
)

const Route = createFileRoute('/(blog)/blog/$slug')({
  component: BlogPage,
})

const { useParams } = Route

export { Route }
