import { useMutation } from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { useAppForm } from 'form'
import type { FC } from 'react'
import { type RegisterSchemaType, registerSchema } from 'schema/auth'
import { Button } from 'ui/ui/button'
import { FieldGroup } from 'ui/ui/field'
import { toast } from 'ui/ui/sonner'
import { register } from '#/api/auth'
import { AuthForm } from '#/components/authForm'
import { LogoText } from '#/components/logo'
import { KEYS } from '#/keys/query'

const RegisterPage: FC = () => {
  const { client } = useRouteContext({
    from: '/(auth)/register',
  })
  const navigate = useNavigate()

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    } satisfies RegisterSchemaType as RegisterSchemaType,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: ({ value }) => mutate(value),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: [...KEYS.auth, form.state.values.email],

    mutationFn: async (formData: RegisterSchemaType) => {
      await new Promise((res, rej) => {
        toast.promise(
          async () =>
            new Promise(async (res, rej) => {
              try {
                const data = await register(formData)

                if (!data) {
                  throw new Error('Something went wrong!')
                }

                res(data)
              } catch (e) {
                rej(e)
              }
            }),
          {
            loading: 'Registering...',
            success: (data) => {
              res(data)
              navigate({
                to: '/',
              })
              client.invalidateQueries({
                queryKey: KEYS.auth,
              })
              return 'Regiseter succesfully'
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
            Create Account
          </Button>
        }
        desc={
          <p>
            Register Your Self to <LogoText />
          </p>
        }
        title="Create New Account"
      >
        <FieldGroup>
          <form.AppField name="name">
            {(field) => (
              <field.Input
                label="Name"
                placeholder="John dow"
              />
            )}
          </form.AppField>
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
              render={<Link to="/login" />}
              variant={'link'}
            >
              Already have account? Login here.
            </Button>

            <Button
              render={<Link to="/forget" />}
              variant={'link'}
            >
              Forget Password
            </Button>
          </div>
        </FieldGroup>
      </AuthForm>
    </form>
  )
}

const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

export { Route }
