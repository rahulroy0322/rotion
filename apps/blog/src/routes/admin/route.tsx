import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import type { FC } from 'react'

const AdminLayout: FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden gap-1">
      {/* <div className=''>
      header
    </div> */}
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
    location,
  }) => {
    if (import.meta.env.PROD && !user) {
      throw redirect({
        to: '/',
      })
    }

    if (location.href === '/admin' || location.href === '/admin/') {
      throw redirect({
        to: '/admin/blog/manage',
      })
    }
  },
})

export { Route }
