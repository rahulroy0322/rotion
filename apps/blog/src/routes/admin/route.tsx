import { ArticleIcon, GaugeIcon, PlusIcon } from '@phosphor-icons/react'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import { Avatar } from '#/components/avatar'
import { Loading } from '#/components/loading'
import { LogoText } from '#/components/logo'
import useAuth from '#/context/auth'
import type { UserType } from '#/types'

type AdminHeaderPropsType = {
  user: Pick<UserType, 'name'>
}

const AdminHeader: FC<AdminHeaderPropsType> = ({ user }) => (
  <header className="p-2 container mx-auto gap-2 flex items-center justify-between">
    <Link to="/">
      <LogoText />
    </Link>

    <nav className="flex gap-2 items-center">
      <Button
        className="bg-transparent text-primary! group"
        nativeButton={false}
        render={
          <Link
            className="no-underline"
            to="/admin"
          />
        }
        size={'lg'}
        variant={'outline'}
      >
        Admin
        <GaugeIcon className="group-hover:scale-105" />
      </Button>
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

      <Avatar
        alt={user.name}
        className="ml-4"
        // TODO!
        // src={user.}
        render={
          <Link
            disabled
            to="/"
          />
        }
        src={'/avatar.webp'}
      />
    </nav>
  </header>
)

const AdminLayout: FC = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden gap-1">
      <AdminHeader
        user={
          user || {
            name: 'Unkown Name',
          }
        }
      />
      <Outlet />
    </div>
  )
}

const Route = createFileRoute('/admin')({
  component: AdminLayout,
  beforeLoad: ({
    context: {
      auth: { user },
    },
  }) => {
    if (import.meta.env.PROD && !user) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

export { Route }
