import { Router } from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constants'

const userRouter = Router()

userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser)

export default userRouter
