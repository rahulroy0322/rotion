import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC } from 'react'
import { Toaster } from 'ui/ui/sonner'
import type { AuthContextType } from '#/context/auth'
import { ErrorPage } from '#/pages/error.page'
import { NotFoundPage } from '#/pages/not-found.page'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

type MyRouterContext = {
  client: QueryClient
  auth: AuthContextType
}

const RootLayout: FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 to-blue-200 flex flex-col">
      <Outlet />
      <Toaster
        closeButton
        richColors
        swipeDirections={['bottom', 'right']}
      />
      {import.meta.env.DEV ? (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      ) : null}
    </div>
  )
}

const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})

export { Route }
