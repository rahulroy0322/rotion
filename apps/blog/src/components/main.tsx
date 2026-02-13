import { cn } from "ui/lib/utils"
import type { ComponentProps, FC, } from "react"

type MainPropsType = ComponentProps<'main'>

const Main: FC<MainPropsType> = ({
  children,
  className,
  ...props
}) =>
  <main {...props} className={cn('container mx-auto', className)}>
    {children}
  </main>

export {
  Main
}