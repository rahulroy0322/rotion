// TODO! move to schema and add extra
import type { RegisterSchemaType } from 'schema/auth'
type _UserType = RegisterSchemaType & {
  role: 'user' | 'admin'
}

type UserType = _UserType & {
  _id: string
}

export type { UserType, _UserType }
