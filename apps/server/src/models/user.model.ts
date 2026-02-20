import { model, Schema } from 'mongoose'
import type { UserType } from '../@types/user'

const UserSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = model<UserType>('user', UserSchema)

export { User }
