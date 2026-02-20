import type { RequestHandler } from 'express'
import { loginSchema, registerSchema } from 'schema/auth'
import type { ResType } from '../@types/res'
import { BadError, ServerError, ZodError } from '../error/app.error'
import { createUser, getUserByEmail } from '../services/auth'
import { hashPassword, validPassword } from '../utils/hash'
import { signToken } from '../utils/token'

const getProfileController: RequestHandler = async (req, res) => {
  if (!req.user) {
    // TODO!
    throw new ServerError("some event dosn't handled properly!")
  }

  const { _id, name, email, role } = req.user

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
    },
  } satisfies ResType)
}

const registerController: RequestHandler = async (req, res) => {
  const valid = registerSchema.safeParse(req.body)

  if (!valid.success) {
    throw new ZodError(valid.error)
  }

  const { data } = valid
  const exists = await getUserByEmail(data.email)

  if (exists) {
    throw new BadError('User Already Exists!')
  }

  const passwd = data.password

  data.password = await hashPassword(passwd)

  const _user = await createUser({
    ...data,
    role: 'user',
  })

  if (!_user) {
    throw new ServerError('something went wrong')
  }
  const { _id, name, email, role } = _user

  const token = signToken({
    _id,
  })

  res.status(201).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
      token,
    },
  } satisfies ResType)
}

const loginController: RequestHandler = async (req, res) => {
  const valid = loginSchema.safeParse(req.body)

  if (!valid.success) {
    throw new ZodError(valid.error)
  }

  const { data } = valid

  const _user = await getUserByEmail(data.email, true)

  if (!_user) {
    throw new BadError('Email or Password is invalid!')
  }

  if (!_user.password) {
    throw new BadError('invalid mathod of login!')
  }

  if (
    !(await validPassword({
      current: data.password,
      hash: _user.password,
    }))
  ) {
    throw new BadError('Email or Password is invalid!')
  }

  const { _id, name, email, role } = _user

  const token = signToken({
    _id: _id,
  })

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
      token,
    },
  } satisfies ResType)
}

export { registerController, loginController, getProfileController }
