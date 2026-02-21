import { Router } from 'express'

import { healthController } from '../controllers/health.controller'
import authRouter from './auth.route'
import blogRouter from './blog.route'

const apiRouter: Router = Router()

apiRouter.all('/health', healthController)
apiRouter.use('/blog', blogRouter)
apiRouter.use('/auth', authRouter)

export default apiRouter
