import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAppForm } from 'form'
import type { FC } from 'react'
import { type LoginSchemaType, loginSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { FieldGroup } from 'ui/ui/field'
import { AuthForm } from '#/components/authForm'

const LoginPage: FC = () => {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    } satisfies LoginSchemaType as LoginSchemaType,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => mutate(value),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['login', form.state.values.email],

    mutationFn: async (_data: LoginSchemaType) => {
      // todo!
      // biome-ignore lint/suspicious/noConsole: temp
      console.log('todo!')

      // toast.promise(login(data), {
      // 	loading: 'Login...',
      // 	success: () => {
      // 		navigate({
      // 			to: '/',
      // 		})
      // 		client.invalidateQueries({
      // 			queryKey: ['auth'],
      // 		})
      // 		return 'Login succesfully'
      // 	},
      // 	error: (e) => {
      // 		if ('message' in e) {
      // 			return e.message
      // 		}

      // 		return 'SomeThing went wrong'
      // 	},
      // })
    },
  })

  return (
    <form
      className="w-3/4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <AuthForm
        actions={
          <Button
            disabled={isPending}
            type="submit"
          >
            Login
          </Button>
        }
        desc="Welcome Back to your Account"
        title="Login To Your Account"
      >
        <FieldGroup>
          <form.AppField name="email">
            {(field) => (
              <field.Input
                label="Email"
                placeholder="john@example.com"
                type="email"
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.Input
                label="Password"
                placeholder={'*'.repeat(8)}
                type="password"
              />
            )}
          </form.AppField>
        </FieldGroup>
        <FieldGroup>
          <div className="flex items-center justify-between">
            <Button
              render={<Link to="/register" />}
              variant={'link'}
            >
              Don't have account? Create Here.
            </Button>

            <Button
              render={<Link to="/forget" />}
              variant={'link'}
            >
              Forget Password{' '}
            </Button>
          </div>
        </FieldGroup>
      </AuthForm>
    </form>
  )
}

const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

export { Route }
