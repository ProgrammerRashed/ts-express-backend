import { Router } from 'express'
import { blogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { blogValidation } from './blog.validation'

const blogRouter = Router()

blogRouter.post('/', validateRequest(blogValidation.blogValidationSchema), blogController.createBlog)
blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.get('/', blogController.getBlogs)
blogRouter.put('/:id', blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

export default blogRouter
