import { SpinnerIcon } from '@phosphor-icons/react'
import type { FC } from 'react'

const Loading: FC = () => {
  return (
    <div className="bg-muted flex items-center justify-center fixed inset-0">
      <SpinnerIcon className="size-16 animate-spin animation-duration-[2.5s]" />
    </div>
  )
}

export { Loading }
