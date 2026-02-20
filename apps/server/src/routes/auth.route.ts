import { Router } from 'express'
import { auth } from '../auth/main'
import {
  getProfileController,
  loginController,
  registerController,
} from '../controllers/auth.controller'

const authRouter: Router = Router()

authRouter
  .route('/me')
  .get(auth.authenticate('jwt', { session: false }), getProfileController)

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)

export default authRouter
