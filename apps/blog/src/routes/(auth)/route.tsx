import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

const AuthLayout: FC = () => (
  <div className="min-h-screen min-w-screen flex items-center justify-center">
    <Outlet />
  </div>
)

const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
})

export { Route }
