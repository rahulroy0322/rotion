// TODO! move to schema and add extra
import type { RegisterSchemaType } from 'schema/auth'
import type { RoleType } from 'schema/role'

type _UserType = RegisterSchemaType & {
  role: RoleType
}

type UserType = _UserType & {
  _id: string
}

type TokenUserType = Pick<UserType, '_id' | 'email' | 'name' | 'role'>

export type { UserType, _UserType, TokenUserType }
