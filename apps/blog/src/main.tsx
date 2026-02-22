import {
  createHashHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { type FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  getContext,
  QueryProvider,
} from './integrations/tanstack-query/root-provider'
import { routeTree } from './routeTree.gen'

import './index.css'
import 'ui/index.css'
import { TooltipProvider } from 'ui/ui/tooltip'
import useAuth, { AuthContextProvider } from './context/auth'

const queryContext = getContext()

const router = createRouter({
  routeTree,
  context: {
    ...queryContext,
    // biome-ignore lint/style/noNonNullAssertion: Trust me
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  history: createHashHistory({
    window,
  }),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App: FC = () => {
  const auth = useAuth()
  return (
    <RouterProvider
      context={{
        auth,
      }}
      router={router}
    />
  )
}

// Render the app
const rootElement = document.getElementById('root')
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <TooltipProvider>
        <QueryProvider {...queryContext}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </QueryProvider>
      </TooltipProvider>
    </StrictMode>
  )
}
