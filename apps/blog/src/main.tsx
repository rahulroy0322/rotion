import { StrictMode, type FC } from 'react'
import { createRoot } from 'react-dom/client'

import { routeTree } from './routeTree.gen'
import { createHashHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { getContext, QueryProvider } from './integrations/tanstack-query/root-provider'

import './index.css'
import 'ui/index.css'

const queryContext = getContext()

const router = createRouter({
  routeTree,
  context: {
    ...queryContext,
    // biome-ignore lint/style/noNonNullAssertion: Trust me
    // auth: undefined!,
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
  // const auth = useAuth()
  // return (

  return <RouterProvider
    // context={{
    //   auth,
    // }}
    // context={
    //   {
    //     _auth: ""
    //   }
    // }
    router={router}
  />
}



// Render the app
const rootElement = document.getElementById('root')
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryProvider {
        ...queryContext
      }>
        {/* 
        <AuthContextProvider> */}
        <App />
      </QueryProvider>
      {/* </AuthContextProvider>
       */}
    </StrictMode>
  )
}