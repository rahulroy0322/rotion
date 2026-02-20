import type { _UserType, UserType } from '../@types/user'
import { User } from '../models/user.model'

const getUserByEmail = (
  email: string,
  includePass = false
): Promise<UserType | null> =>
  User.findOne(
    {
      email,
    },
    includePass ? '+password' : undefined
  )

const getUserById = (id: string): Promise<UserType | null> => User.findById(id)

const createUser = (user: _UserType): Promise<UserType | null> =>
  User.create(user) as unknown as Promise<UserType>

export { getUserByEmail, createUser, getUserById }
