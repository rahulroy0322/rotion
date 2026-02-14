import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'

const getContext = () => {
  const client = new QueryClient()
  return {
    client,
  }
}

type QueryProviderPropsType = {
  children: ReactNode
  client: QueryClient
}

const QueryProvider: FC<QueryProviderPropsType> = (props) => (
  <QueryClientProvider {...props} />
)

export { QueryProvider, getContext }
