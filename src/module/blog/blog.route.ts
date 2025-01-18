import { Router } from 'express'
import { blogController } from './blog.controller'

const blogRouter = Router()

blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.get('/', blogController.getBlogs)
blogRouter.post('/', blogController.createBlog)
blogRouter.put('/:id', blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

export default blogRouter
