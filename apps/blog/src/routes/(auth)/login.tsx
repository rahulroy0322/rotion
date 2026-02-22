import { useMutation } from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { useAppForm } from 'form'
import type { FC } from 'react'
import { type LoginSchemaType, loginSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { FieldGroup } from 'ui/ui/field'
import { toast } from 'ui/ui/sonner'
import { login } from '#/api/auth'
import { AuthForm } from '#/components/authForm'
import { KEYS } from '#/keys/query'

const LoginPage: FC = () => {
  const { client } = useRouteContext({
    from: '/(auth)/login',
  })
  const navigate = useNavigate()

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
    mutationKey: [...KEYS.auth, form.state.values.email],

    mutationFn: async (formData: LoginSchemaType) => {
      await new Promise((res, rej) => {
        toast.promise(
          async () =>
            new Promise(async (res, rej) => {
              try {
                const data = await login(formData)

                if (!data) {
                  throw new Error('Something went wrong!')
                }

                res(data)
              } catch (e) {
                rej(e)
              }
            }),
          {
            loading: 'Login...',
            success: (data) => {
              res(data)
              navigate({
                to: '/',
              })
              client.invalidateQueries({
                queryKey: KEYS.auth,
              })
              return 'Login succesfully'
            },
            error: (e) => {
              rej(e)
              return (
                <div>
                  <b>Error: </b>
                  <span>{e?.message ?? 'SomeThing went wrong'}</span>
                </div>
              )
            },
          }
        )
      })
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
              nativeButton={false}
              render={<Link to="/register" />}
              variant={'link'}
            >
              Don't have account? Create Here.
            </Button>

            <Button
              nativeButton={false}
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
