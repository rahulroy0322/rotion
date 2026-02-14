import { Button } from 'ui/ui/button'
import { FieldGroup } from 'ui/ui/field'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAppForm } from 'form'
import type { FC } from 'react'
import { registerSchema, type RegisterSchemaType } from 'schema/auth'
import { AuthForm } from '#/components/authForm'
import { LogoText } from '#/components/logo'

const RegisterPage: FC = () => {
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
		mutationKey: ['register', form.state.values.email],

		mutationFn:async (_data: RegisterSchemaType) => {
			// todo!
			console.log('todo!');
			// toast.promise(register(data), {
			// 				loading: 'Registering...',
			// 				success: () => {
			// 					navigate({
			// 						to: '/',
			// 					})
			// 					client.invalidateQueries({
			// 						queryKey: ['auth'],
			// 					})
			// 					return 'Regiseter succesfully'
			// 				},
			// 				error: (e) => {
			// 					if ('message' in e) {
			// 						return e.message
			// 					}

			// 					return 'SomeThing went wrong'
			// 				},
			// 			})
		},
	})

	return <form className='w-3/4'
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
						variant={'link'}
						render={
							<Link
								to="/login"
							/>
						}
					>Already have account? Login here.
					</Button>

					<Button
						render={
							<Link
								to="/forget"
							/>
						}
						variant={'link'}
					>Forget Password
					</Button>
				</div>
			</FieldGroup>
		</AuthForm>

	</form>
}


const Route = createFileRoute('/(auth)/register')({
	component: RegisterPage,
})

export {
	Route
}
