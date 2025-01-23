import { Router } from 'express'
import { blogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { blogValidation } from './blog.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constants'

const blogRouter = Router()

blogRouter.post('/', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(blogValidation.blogValidationSchema), blogController.createBlog)
blogRouter.get('/:id',  blogController.getSingleBlog)
blogRouter.get('/', blogController.getBlogs)
blogRouter.patch('/:id',auth(USER_ROLE.user), blogController.updateBlog)
blogRouter.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.deleteBlog)

export default blogRouter
