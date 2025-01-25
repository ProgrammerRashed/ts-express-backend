import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constants'

const userRouter = Router()

userRouter.get('/user/:userId', userController.getSingleUser)
userRouter.patch('/admin/users/:userId/block', auth(USER_ROLE.admin), userController.updateUser)
userRouter.get('/users', auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser)

export default userRouter
