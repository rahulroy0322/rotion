import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import { Loading } from '#/components/loading'
import useAuth from '#/context/auth'

const AuthLayout: FC = () => {
  const navigate = useNavigate()
  const { isLoading, user } = useAuth()

  if (user) {
    return navigate({
      to: '/',
    }) as never
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Outlet />
    </div>
  )
}

const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

export { Route }
