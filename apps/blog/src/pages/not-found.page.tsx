import { HouseIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from 'ui/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'ui/ui/card'

const NotFoundPage: FC = () => {
  return (
    <div className="max-w-md mx-auto space-y-6 p-2 min-h-screen flex flex-col items-center justify-center">
      <Card className="border-secondary-foreground">
        <CardHeader className="text-center">
          <CardTitle>
            <div className="flex flex-col items-center justify-center text-center gap-2">
              <h2 className="text-xl font-semibold text-slate-700">
                Page Not Found
              </h2>
            </div>
          </CardTitle>
          <CardDescription className="text-balance text-xl">
            Oops! The page you're looking for seems to have gone out of bounds.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-md text-center text-balance">
            The page you're trying to access doesn't exist or may have been
            moved.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <Button render={<Link to="/" />}>
              <HouseIcon className="size-5" /> Go to Home
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-foreground">
            Need help? Contact support.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export { NotFoundPage }
