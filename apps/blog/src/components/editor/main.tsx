import StarterKit from '@tiptap/starter-kit'
import './editor.css'
import {
  FileDashedIcon,
  FloppyDiskIcon,
  GearFineIcon,
  type Icon,
  PaperPlaneTiltIcon,
  UploadIcon,
  XIcon,
} from '@phosphor-icons/react'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { type FC, useState } from 'react'
import {
  type BlogSchemaType,
  type BlogStatusType,
  type BlogType,
  blogSchema,
} from 'schema/blog'
import { Button } from 'ui/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'ui/ui/drawer'
import { Input } from 'ui/ui/input'
import { toast } from 'ui/ui/sonner'
import { createBlog, updateBlog } from '#/api/blog'
import { KEYS } from '#/keys/query'
import { BlogBubbleMenu, BlogMainMenu } from './menu'

const extensions = [TextStyleKit, StarterKit]

type BlogHeaderActionPropsType = Pick<BlogFormHeaderPropsType, 'client'> & {
  getBlogFromData: () => ReturnType<typeof blogSchema.safeParse>
  Icon: Icon
  disabled: boolean
  mutationKey: readonly string[]
  loading: string
  success: string
  fn: (data: BlogSchemaType) => Promise<BlogType | null>
  redirect?: boolean
}

const BlogHeaderAction: FC<BlogHeaderActionPropsType> = ({
  Icon,
  disabled,
  mutationKey,
  loading,
  success,
  client,
  getBlogFromData,
  fn,
  redirect = true,
}) => {
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn: async () => {
      await new Promise((res, rej) => {
        toast.promise(
          async () => {
            const parsed = getBlogFromData()

            if (!parsed.success) {
              throw parsed.error
            }

            return new Promise(async (res, rej) => {
              try {
                const data = await fn(parsed.data)

                if (!data) {
                  throw new Error('Something went wrong!')
                }

                res(data)
              } catch (e) {
                rej(e)
              }
            })
          },
          {
            loading,
            success: () => {
              res({})
              if (redirect) {
                navigate({
                  href: '/admin',
                })
              }

              client.invalidateQueries({
                queryKey: KEYS.blogs,
              })
              return success
            },
            error: (e: Error) => {
              rej(e)
              return (
                <div>
                  <b>Error: </b>
                  <span>{e?.message ?? 'SomeThing went wrong'}</span>
                </div>
              )
            },
          }
        )
      })
    },
  })

  return (
    <Button
      disabled={disabled || isPending}
      onClick={() => mutate()}
      size={'icon'}
    >
      <Icon />
    </Button>
  )
}

type BlogSaveActionPropsType = Pick<
  BlogHeaderActionPropsType,
  'client' | 'getBlogFromData'
> &
  Pick<BlogFormHeaderPropsType, 'title' | 'slug'>

const BlogSaveAction: FC<BlogSaveActionPropsType> = ({
  title,
  slug,
  getBlogFromData,
  client,
}) => (
  <BlogHeaderAction
    client={client}
    disabled={!title || !slug}
    fn={createBlog}
    getBlogFromData={getBlogFromData}
    Icon={FloppyDiskIcon}
    loading="Saving Blog..."
    mutationKey={[...KEYS.blogs, title]}
    success="Blog Craeted Successfully"
  />
)

type BlogDraftActionPropsType = BlogSaveActionPropsType

const BlogDraftAction: FC<BlogDraftActionPropsType> = ({
  title,
  slug,
  getBlogFromData,
  client,
}) => (
  <BlogHeaderAction
    client={client}
    disabled={!title || !slug}
    fn={(blog) =>
      updateBlog(slug, {
        ...blog,
        status: 'draft',
      })
    }
    getBlogFromData={getBlogFromData}
    Icon={FileDashedIcon}
    loading="Unpulishing Blog..."
    mutationKey={[...KEYS.blogs, title]}
    success="Blog Draft Successfully"
  />
)

type BlogPublishActionPropsType = BlogSaveActionPropsType

const BlogPublishAction: FC<BlogPublishActionPropsType> = ({
  title,
  slug,
  getBlogFromData,
  client,
}) => (
  <BlogHeaderAction
    client={client}
    disabled={!title || !slug}
    fn={(blog) =>
      updateBlog(slug, {
        ...blog,
        status: 'published',
      })
    }
    getBlogFromData={getBlogFromData}
    Icon={PaperPlaneTiltIcon}
    loading="Pulishing Blog..."
    mutationKey={[...KEYS.blogs, title]}
    success="Blog Published Successfully"
  />
)

type BlogUpdateActionPropsType = BlogSaveActionPropsType

const BlogUpdateAction: FC<BlogUpdateActionPropsType> = ({
  title,
  slug,
  getBlogFromData,
  client,
}) => (
  <BlogHeaderAction
    client={client}
    disabled={!title || !slug}
    fn={(blog) => updateBlog(slug, blog)}
    getBlogFromData={getBlogFromData}
    Icon={UploadIcon}
    loading="Updateing Blog..."
    mutationKey={[...KEYS.blogs, title]}
    redirect={false}
    success="Blog Updated Successfully"
  />
)

type BlogFormHeaderPropsType = {
  editor: Editor
  title: string
  setTitle: (title: string) => void
  slug: string
  genSlug: () => void
  setSlug: (title: string) => void
  client: QueryClient
  id: string | null
  status: BlogStatusType | null
  // categories: string[]
}

const BlogFormHeader: FC<BlogFormHeaderPropsType> = ({
  title,
  setTitle,
  slug,
  genSlug,
  setSlug,
  editor,
  client,
  status,
  id,
}) => {
  const getBlogFromData = () => {
    const content = editor.getHTML().replace(/\s*/, ' ').trim()

    return blogSchema.safeParse({
      title,
      slug,
      content,
      status: status || 'draft',
    })
  }

  return (
    <div className="flex gap-1 items-center">
      <Input
        className="grow"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      {!id ? (
        <BlogSaveAction
          client={client}
          getBlogFromData={getBlogFromData}
          slug={slug}
          title={title}
        />
      ) : status === 'published' ? (
        <BlogDraftAction
          client={client}
          getBlogFromData={getBlogFromData}
          slug={slug}
          title={title}
        />
      ) : (
        <BlogPublishAction
          client={client}
          getBlogFromData={getBlogFromData}
          slug={slug}
          title={title}
        />
      )}
      {id ? (
        <BlogUpdateAction
          client={client}
          getBlogFromData={getBlogFromData}
          slug={slug}
          title={title}
        />
      ) : null}
      <BlogFormSettings
        genSlug={genSlug}
        setSlug={setSlug}
        slug={slug}
        title={title}
      />
    </div>
  )
}

type BlogFormSettingsPropsType = Pick<
  BlogFormHeaderPropsType,
  'title' | 'genSlug' | 'setSlug' | 'slug'
>

const BlogFormSettings: FC<BlogFormSettingsPropsType> = ({
  slug,
  setSlug,
  title,
  genSlug,
}) => (
  <Drawer direction="right">
    <DrawerTrigger asChild>
      <Button size={'icon'}>
        <GearFineIcon />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader className="flex-row items-center justify-between">
        <DrawerTitle>Blog Settings</DrawerTitle>

        <Button
          render={<DrawerClose />}
          size={'icon'}
          variant={'ghost'}
        >
          <XIcon />
        </Button>
      </DrawerHeader>
      <div className="px-4 space-y-2">
        <Input
          onChange={(e) => setSlug(e.target.value)}
          placeholder="generate slug for your blog"
          value={slug}
        />
        <Button
          disabled={!title}
          onClick={genSlug}
        >
          Generate slug
        </Button>
      </div>
    </DrawerContent>
  </Drawer>
)

type BlogFormPropsType = {
  client: QueryClient
  blog?: BlogType
}

const BlogForm: FC<BlogFormPropsType> = ({ client, blog }) => {
  const [title, setTitle] = useState(blog?.title || '')
  const [slug, setSlug] = useState(blog?.slug || '')

  const genSlug = () => {
    setSlug(title.trim().toLowerCase().replace(/\s+/gi, '-'))
  }

  const editor = useEditor({
    extensions,
    content: blog?.content || '',
  })

  return (
    <div className="prose p-4 flex flex-col gap-2 grow container mx-auto overflow-hidden">
      <BlogFormHeader
        client={client}
        editor={editor}
        genSlug={genSlug}
        id={blog?._id || null}
        setSlug={setSlug}
        setTitle={setTitle}
        slug={slug}
        status={blog?.status || null}
        title={title}
      />

      <BlogMainMenu editor={editor} />
      <BlogBubbleMenu editor={editor} />
      <EditorContent
        className="grow overflow-auto outline"
        editor={editor}
      />
    </div>
  )
}

export { BlogForm }
