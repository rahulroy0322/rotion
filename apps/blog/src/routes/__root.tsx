import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { Loading } from '@/components/app/loading'
// import type { AuthContextType } from '@/context/auth'
// import { ErrorPage } from '@/pages/error.page'
// import { NotFoundPage } from '@/pages/not-found.page'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'


type MyRouterContext = {
  client: QueryClient
  // auth: AuthContextType
}


const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,

})

function RootComponent() {
  return (
    <div className='min-h-screen bg-linear-to-b from-slate-100 to-blue-200 flex flex-col'>
      {/* <MainHeader /> */}
      <Outlet />
      {/* <MainFooter /> */}
      {/* <Toaster
			closeButton
			richColors
			swipeDirections={['bottom', 'right']}
		/> */}
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


export {
  Route
}