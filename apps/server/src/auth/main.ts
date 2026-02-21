import auth from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import ENV from '../config/env.config'
import logger from '../logger/pino'
import { getUserById } from '../services/auth'
import type { TokenType } from '../utils/token'

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

auth.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ENV.JWT_SECRET,
    },
    async ({ _id }: TokenType, done) => {
      try {
        // TODO! check cache
        const user = await getUserById(_id)

        if (!user) {
          return done(null, false, {
            msg: 'user not found',
          })
        }
        done(null, user)
      } catch (e) {
        logger.error(e, 'User not found', { _id })
        return done(e, false)
      }
    }
  )
)

export { auth }
