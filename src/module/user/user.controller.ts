import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import getLoggedUser from '../../middlewares/getLoggedUser'
import { LoggedUser } from '../../interface/types'


const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User getting successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const loggedUserData = await getLoggedUser(req);
  const loggedUser: LoggedUser = loggedUserData as LoggedUser;
  if (!loggedUser) {
    throw new Error("User not found");
  }
  const hasUpdatePermission = loggedUser.role === "admin";
  
  if (!hasUpdatePermission) {
    const error = new Error("You do not have permission to update this user");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  await userService.updateUser(userId, {isBlocked: true})


  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Blocked successfully',
    data: {},
  })
})


export const userController = {
  getUser,
  getSingleUser,
  updateUser,
}
