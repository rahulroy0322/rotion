'use no memo'
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  BroomIcon,
  CodeBlockIcon,
  CodeIcon,
  LineVerticalIcon,
  ListIcon,
  ListNumbersIcon,
  MinusIcon,
  ParagraphIcon,
  QuotesIcon,
  TextBolderIcon,
  TextHFiveIcon,
  TextHFourIcon,
  TextHOneIcon,
  TextHSixIcon,
  TextHThreeIcon,
  TextHTwoIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextTSlashIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react'
import type { EditorStateSnapshot } from '@tiptap/react'
import { type Editor, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import type { FC } from 'react'
import { Toggle } from 'ui/ui/toggle'

const menuBarStateSelector = (ctx: EditorStateSnapshot<Editor>) => ({
  // Text formatting
  isBold: ctx.editor.isActive('bold') ?? false,
  canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
  isUnderLine: ctx.editor.isActive('underline') ?? false,
  canUnderLine: ctx.editor.can().chain().toggleUnderline().run() ?? false,
  isItalic: ctx.editor.isActive('italic') ?? false,
  canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
  isStrike: ctx.editor.isActive('strike') ?? false,
  canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
  isCode: ctx.editor.isActive('code') ?? false,
  canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
  canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

  // Block types
  isParagraph: ctx.editor.isActive('paragraph') ?? false,
  isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
  isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
  isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
  isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
  isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
  isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,

  // Lists and blocks
  isBulletList: ctx.editor.isActive('bulletList') ?? false,
  isOrderedList: ctx.editor.isActive('orderedList') ?? false,
  isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
  isBlockquote: ctx.editor.isActive('blockquote') ?? false,

  // History
  canUndo: ctx.editor.can().chain().undo().run() ?? false,
  canRedo: ctx.editor.can().chain().redo().run() ?? false,
})

type BlogMainMenuPropsType = {
  editor: Editor
}

const BlogMainMenu: FC<BlogMainMenuPropsType> = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center flex-wrap justify-center gap-1">
      <Toggle
        aria-label="Toggle bold"
        disabled={!editorState.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        pressed={editorState.isBold}
        variant="outline"
      >
        <TextBolderIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle underline"
        disabled={!editorState.canUnderLine}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editorState.isUnderLine}
        variant="outline"
      >
        <TextUnderlineIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle italic"
        disabled={!editorState.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        pressed={editorState.isItalic}
        variant="outline"
      >
        <TextItalicIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle strike"
        disabled={!editorState.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        pressed={editorState.isStrike}
        variant="outline"
      >
        <TextStrikethroughIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle code"
        disabled={!editorState.canCode}
        onClick={() => editor.chain().focus().toggleCode().run()}
        pressed={editorState.isCode}
        variant="outline"
      >
        <CodeIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle clear formating"
        disabled={!editorState.canClearMarks}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        pressed={false}
        variant="outline"
      >
        <TextTSlashIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle clear notes"
        onClick={() => editor.chain().focus().clearNodes().run()}
        pressed={false}
        variant="outline"
      >
        <BroomIcon />
      </Toggle>

      <Toggle
        aria-label="Toggle paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        pressed={editorState.isParagraph}
        variant="outline"
      >
        <ParagraphIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 1,
            })
            .run()
        }
        pressed={editorState.isHeading1}
        variant="outline"
      >
        <TextHOneIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 2"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2,
            })
            .run()
        }
        pressed={editorState.isHeading2}
        variant="outline"
      >
        <TextHTwoIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 3"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 3,
            })
            .run()
        }
        pressed={editorState.isHeading3}
        variant="outline"
      >
        <TextHThreeIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 4"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 4,
            })
            .run()
        }
        pressed={editorState.isHeading4}
        variant="outline"
      >
        <TextHFourIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 5"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 5,
            })
            .run()
        }
        pressed={editorState.isHeading5}
        variant="outline"
      >
        <TextHFiveIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle heading 6"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 6,
            })
            .run()
        }
        pressed={editorState.isHeading6}
        variant="outline"
      >
        <TextHSixIcon />
      </Toggle>

      <Toggle
        aria-label="Toggle list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editorState.isBulletList}
        variant="outline"
      >
        <ListIcon />
      </Toggle>

      <Toggle
        aria-label="Toggle number list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editorState.isOrderedList}
        variant="outline"
      >
        <ListNumbersIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        pressed={editorState.isCodeBlock}
        variant="outline"
      >
        <CodeBlockIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle quote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editorState.isBlockquote}
        variant="outline"
      >
        <QuotesIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        pressed={false}
        variant="outline"
      >
        <MinusIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle Hard break"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        pressed={false}
        variant="outline"
      >
        <LineVerticalIcon />
      </Toggle>

      <Toggle
        aria-label="Toggle Undo"
        disabled={!editorState.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
        pressed={false}
        variant="outline"
      >
        <ArrowUUpLeftIcon />
      </Toggle>

      <Toggle
        aria-label="Toggle Redo"
        disabled={!editorState.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
        pressed={false}
        variant="outline"
      >
        <ArrowUUpRightIcon />
      </Toggle>
    </div>
  )
}

type BlogBubbleMenuPropsType = {
  editor: Editor
}

const BlogBubbleMenu: FC<BlogBubbleMenuPropsType> = ({ editor }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  return (
    <BubbleMenu
      className="bg-background flex gap-2 p-1 shadow"
      editor={editor}
    >
      <Toggle
        aria-label="Toggle bold"
        disabled={!editorState.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        pressed={editorState.isBold}
        variant="outline"
      >
        <TextBolderIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle underline"
        disabled={!editorState.canUnderLine}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editorState.isUnderLine}
        variant="outline"
      >
        <TextUnderlineIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle italic"
        disabled={!editorState.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        pressed={editorState.isItalic}
        variant="outline"
      >
        <TextItalicIcon />
      </Toggle>
      <Toggle
        aria-label="Toggle strike"
        disabled={!editorState.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        pressed={editorState.isStrike}
        variant="outline"
      >
        <TextStrikethroughIcon />
      </Toggle>
    </BubbleMenu>
  )
}

export { BlogMainMenu, BlogBubbleMenu }
