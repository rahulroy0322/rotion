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
  }) => {
    if (!user) {
      throw redirect({
        to: '/',
      })
    }
  },
})

export { Route }
