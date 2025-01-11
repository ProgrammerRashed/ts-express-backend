import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// ALL READ METHODS
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const result = await userService.getUser(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUser();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// ALL WRITE METHOD
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const result = await userService.createUser(payload);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await userService.updateUser(id, data);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// EXPORTS
export const userController = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
};
