import type { ComponentProps, FC } from 'react'
import { cn } from 'ui/lib/utils'

type MainPropsType = ComponentProps<'main'>

const Main: FC<MainPropsType> = ({ children, className, ...props }) => (
  <main
    {...props}
    className={cn('container mx-auto', className)}
  >
    {children}
  </main>
)

export { Main }
