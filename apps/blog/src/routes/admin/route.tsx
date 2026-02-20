import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden gap-1">
      {/* <div className=''>
      header
    </div> */}
      <Outlet />
    </div>
  )
}
