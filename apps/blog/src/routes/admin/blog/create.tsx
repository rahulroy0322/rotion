import { createFileRoute } from '@tanstack/react-router'

import { TextStyleKit } from '@tiptap/extension-text-style'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { type FC, useState } from 'react'

import './create.css'
import {
  FileDashedIcon,
  GearFineIcon,
  PaperPlaneTiltIcon,
  UploadIcon,
  XIcon,
} from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { blogSchema } from 'schema/blog'
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
import { BlogBubbleMenu, BlogMainMenu } from '#/components/editor/menu'

const extensions = [TextStyleKit, StarterKit]

type CreateBlogHeaderPropsType = {
  editor: Editor
  title: string
  setTitle: (title: string) => void
  slug: string
  genSlug: () => void
  setSlug: (title: string) => void
  // id: string
  // categories: string[]
}

const CreateBlogHeader: FC<CreateBlogHeaderPropsType> = ({
  title,
  setTitle,
  slug,
  genSlug,
  setSlug,
  editor,
}) => {
  const { mutate: save, isPending: isSavePending } = useMutation({
    mutationKey: ['blogs', title],
    mutationFn: async () => {
      await new Promise((res, rej) => {
        toast.promise(
          async () => {
            const content = editor.getHTML().replace(/\s*/, ' ').trim()

            const parsed = blogSchema.safeParse({
              title,
              slug,
              content,
            })

            if (!parsed.success) {
              throw parsed.error
            }

            return new Promise((res, rej) => {
              setTimeout(Math.random() > 0.5 ? res : rej, 2000)
            })
          },
          {
            loading: 'Saving Blog...',
            success: () => {
              res({})
              return 'Blog Save Successfully'
            },
            error: (e) => {
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
    <div className="flex gap-1 items-center">
      <Input
        className="grow"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Button
        disabled={!title || !slug || isSavePending}
        onClick={() => save()}
        size={'icon'}
      >
        <UploadIcon />
      </Button>
      <Button
        disabled={!title || !slug || isSavePending}
        size={'icon'}
      >
        <FileDashedIcon />
      </Button>
      <Button
        disabled={!title || !slug || isSavePending}
        size={'icon'}
      >
        <PaperPlaneTiltIcon />
      </Button>
      <CreateBlogSettings
        genSlug={genSlug}
        setSlug={setSlug}
        slug={slug}
        title={title}
      />
    </div>
  )
}

type CreateBlogSettingsPropsType = Pick<
  CreateBlogHeaderPropsType,
  'title' | 'genSlug' | 'setSlug' | 'slug'
>

const CreateBlogSettings: FC<CreateBlogSettingsPropsType> = ({
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

const CreateBlogPage: FC = () => {
  const [title, setTitle] = useState('this is My Fisrt Blog')
  const [slug, setSlug] = useState('')

  const genSlug = () => {
    setSlug(title.trim().toLowerCase().replace(/\s+/gi, '-'))
  }

  const editor = useEditor({
    extensions,

    // editable: false,

    content: `
<h2>
  Hi there,
</h2>
<hr/>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul><ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul><ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<ol>
<li>axvhghsaj</li>
</ol>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code>body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
  })

  return (
    <div className="prose p-4 flex flex-col gap-2 grow container mx-auto overflow-hidden">
      <CreateBlogHeader
        editor={editor}
        genSlug={genSlug}
        setSlug={setSlug}
        setTitle={setTitle}
        slug={slug}
        title={title}
      />

      <BlogMainMenu editor={editor} />
      <BlogBubbleMenu editor={editor} />
      <EditorContent
        className="grow overflow-auto"
        editor={editor}
      />
    </div>
  )
}

const Route = createFileRoute('/admin/blog/create')({
  component: CreateBlogPage,
})

export { Route }
