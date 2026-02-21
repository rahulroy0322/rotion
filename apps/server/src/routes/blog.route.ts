import { Router } from 'express'
import {
  createBlogController,
  getPublishedBlogBySlugController,
  getPublishedBlogsController,
  updateBlogController,
} from '../controllers/blog.controller'
import {
  authRequired,
  checkAuth,
  roleRequired,
} from '../middlewares/auth.middleware'

const blogRouter: Router = Router()

blogRouter
  .route('/')
  .get(checkAuth, getPublishedBlogsController)
  .post(
    checkAuth,
    authRequired,
    roleRequired(['admin', 'super']),
    createBlogController
  )

blogRouter
  .route('/:slug')
  .get(checkAuth, getPublishedBlogBySlugController)
  .patch(
    checkAuth,
    authRequired,
    roleRequired(['admin', 'super']),
    updateBlogController
  )

export default blogRouter
