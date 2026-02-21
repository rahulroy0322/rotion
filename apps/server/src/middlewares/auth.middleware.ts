import type { RequestHandler } from 'express'
import type { AuthenticateCallback } from 'passport'
import type { RoleType } from 'schema/role'
import { auth } from '../auth/main'
import {
  ForbidenError,
  ServerError,
  UnAuthenticatedError,
} from '../error/app.error'

const checkAuth: RequestHandler = (req, res, next) =>
  auth.authenticate(
    'jwt',
    {
      session: false,
    },
    ((_err, user) => {
      req.user = user || undefined
      next()
    }) satisfies AuthenticateCallback
  )(req, res, next)

const authRequired: RequestHandler = async (req, _res, next) => {
  if (!req.user) {
    throw new UnAuthenticatedError('Login to access!')
  }

  // TODO! check cache!
  // const user = await getUserById(req.userId);

  // if (!user) {
  //     // res.status(401);
  //     // Todo!
  //     // logger.error({ user, userId: req.userId }, 'User Not found!');

  //     throw new UnAuthenticatedError('Your account had been deleted!');
  // }

  next()
}

const roleRequired = (roles: RoleType[]) => {
  return (async (req, _res, next) => {
    const user = req.user
    if (!user) {
      throw new ServerError("some event dosn't handled properly!", {
        user: 'undefined',
      })
    }

    if (!roles.includes(user.role)) {
      throw new ForbidenError("You Don't Sufficient permition")
    }
    next()
  }) satisfies RequestHandler
}
export { checkAuth, authRequired, roleRequired }
