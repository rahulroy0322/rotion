import {
  ArticleIcon,
  CardsIcon,
  ChartLineIcon,
  ChatsCircleIcon,
  CurrencyBtcIcon,
  GearFineIcon,
  LayoutIcon,
  PaintRollerIcon,
  PlusIcon,
} from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'

const AdminPage: FC = () => (
  <div className="grow p-4 flex items-center justify-center">
    <div className="flex items-center justify-center flex-wrap gap-2 *:flex-1 *:basis-1/4">
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            to="/admin/blog/create"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <PlusIcon />
        Create Blog
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            to="/admin/blog/manage"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <ArticleIcon />
        Manage Blogs
      </Button>

      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <ChartLineIcon />
        Stats
      </Button>

      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <ChatsCircleIcon />
        Comments
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <CurrencyBtcIcon />
        Earnings
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <CardsIcon />
        Pages
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <LayoutIcon />
        Layout
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'destructive'}
      >
        <PaintRollerIcon />
        Theme
      </Button>
      <Button
        className="bg-transparent text-primary!"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            disabled
            to="/"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        <GearFineIcon />
        Settings
      </Button>
    </div>
  </div>
)

const Route = createFileRoute('/admin/')({
  component: AdminPage,
})

export { Route }
