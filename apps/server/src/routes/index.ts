import { Router } from 'express'

import { healthController } from '../controllers/health.controller'
import authRouter from './auth.route'
import blogRouter from './blog.route'

const apiRouter: Router = Router()

apiRouter.all('/health', healthController)
apiRouter.use('/blog', blogRouter)
apiRouter.use('/auth', authRouter)

// apiRouter.use('/admin', adminRouter);
// apiRouter.use('/logs', logsRouter);

// apiRouter.use('/tournaments', tournamentsRouter);
// apiRouter.use('/matches', matchsRouter);
// apiRouter.use('/comments', commentsRouter);
// apiRouter.use('/players', playersRouter);
// apiRouter.use('/teams', teamsRouter);

export default apiRouter
