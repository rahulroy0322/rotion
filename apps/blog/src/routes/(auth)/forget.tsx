import { createFileRoute } from '@tanstack/react-router'

// const LoginPage: FC = () => {
// 	const form = useAppForm({
// 		defaultValues: {
// 			email: '',
// 			password: '',
// 		} satisfies LoginSchemaType,
// 		validators: {
// 			onSubmit: loginSchema,
// 		},
// 		onSubmit: ({ value }) => mutate(value),
// 	})

// 	const { mutate, isPending } = useMutation<unknown, unknown, LoginSchemaType>({
// 		mutationKey: ['register', form.state.values.email],

// 		mutationFn: async (data: LoginSchemaType) => {
// 			// todo!
// 			console.log('todo!');

// 			// toast.promise(login(data), {
// 			// 	loading: 'Login...',
// 			// 	success: () => {
// 			// 		navigate({
// 			// 			to: '/',
// 			// 		})
// 			// 		client.invalidateQueries({
// 			// 			queryKey: ['auth'],
// 			// 		})
// 			// 		return 'Login succesfully'
// 			// 	},
// 			// 	error: (e) => {
// 			// 		if ('message' in e) {
// 			// 			return e.message
// 			// 		}

// 			// 		return 'SomeThing went wrong'
// 			// 	},
// 			// })
// 		},
// 	})

// 	return <form className='w-3/4'
// 		onSubmit={form.handleSubmit}
// 	>
// 		<AuthForm
// 			actions={
// 				<Button
// 					disabled={isPending}
// 					type='submit'
// 				>
// 					Login
// 				</Button>
// 			}
// 			desc="Welcome Back to your Account"
// 			title="Login To Your Account"
// 		>
// 			<FieldGroup>
// 				<form.AppField name="email">
// 					{(field) => (
// 						<field.Input
// 							label='Email'
// 							placeholder="john@example.com"
// 							type='email'
// 						/>
// 					)}
// 				</form.AppField>
// 				<form.AppField name="password">
// 					{(field) => (
// 						<field.Input
// 							label='Password'
// 							placeholder={'*'.repeat(8)}
// 							type='password'
// 						/>
// 					)}
// 				</form.AppField>
// 			</FieldGroup>
// 			<FieldGroup>
// 				<div className="flex items-center justify-between">

// 					<Button
// 						variant={'link'}

// 						render={
// 							<Link to='/register' />
// 						}
// 					>
// 						Don't have account? Create Here.
// 					</Button>

// 					<Button
// 						variant={'link'}
// 						render={
// 							<Link to='/forget' />
// 						}
// 					>Forget Password				</Button>
// 				</div>
// 			</FieldGroup>
// 		</AuthForm>

// 	</form>
// }


import type { FC } from "react"

type ForgetPagePropsType={
	
}

const ForgetPage:FC<ForgetPagePropsType> = ()=> <div className='text-2xl font-extrabold text-destructive'>
	TODO!
</div>

const Route = createFileRoute('/(auth)/forget')({
	component: ForgetPage,
})

export {
	Route
}
