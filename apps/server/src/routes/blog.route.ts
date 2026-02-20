import { Router } from 'express'
import {
  createBlogController,
  getPublishedBlogBySlugController,
  getPublishedBlogsController,
} from '../controllers/blog.controller'

const blogRouter: Router = Router()

blogRouter
  .route('/')
  .get(getPublishedBlogsController)
  .post(createBlogController)

blogRouter.route('/:slug').get(getPublishedBlogBySlugController)
// .post(createBlogController)

// blogRouter
//   .route('/')
//   .get(getAllMatchsController)
//   // TODO! check auth!
//   .post(createMatchController);

// blogRouter
//   .route('/:id')
//   .get(getMatchByIdController)
//   // TODO! check auth!
//   .patch(patchMatchByIdController);

// blogRouter
//   .route('/:id/start')
//   // TODO! check auth!
//   .post(startMatchByIdController);

// blogRouter.get(
//   '/:tournamentId/matches',
//   getAllMatchsByTournamentIdController
// );

export default blogRouter
