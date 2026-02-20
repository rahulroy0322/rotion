import type { LoginSchemaType, RegisterSchemaType } from 'schema/auth'
import { BASE_URL } from '#/const/url'
import { saveToken } from '#/lib/token'
import type { ResType, UserType } from '#/types'

const post = async (route: string, data: unknown) => {
  const res = await fetch(`${BASE_URL}/auth/${route}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const _data = (await res.json()) as ResType<{
    user: UserType | null
    token: string
  }>

  if (!_data.success) {
    throw _data.error
  }

  saveToken(_data.data.token)

  return _data.data.user
}

const register = (user: RegisterSchemaType) => post('register', user)

const login = async (user: LoginSchemaType) => post('login', user)

export { register, login }
