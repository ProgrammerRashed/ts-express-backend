import { Request, Response } from "express";
import { blogServices } from "./blog.service";
import getLoggedUser from "../../middlewares/getLoggedUser";
import { LoggedUser } from "../../interface/types";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IBlog } from "./blog.interface";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const loggedUserData = await getLoggedUser(req);
  const loggedUser: LoggedUser = loggedUserData as LoggedUser;

  const blogDetails = {
    title: req.body.title,
    content: req.body.content,
    author: loggedUser?._id,
    isPublished: true
  };
  const result: IBlog = await blogServices.createBlog(blogDetails);
  const cleanResult: IBlog = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
    isPublished: result.isPublished
  };

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog Created Successfully",
    data: cleanResult
  });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getBlogs(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully",
    data: result
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogServices.getSingleBlog(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog fetched successfully",
    data: result
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;

  const loggedUserData = await getLoggedUser(req);
  const loggedUser: LoggedUser = loggedUserData as LoggedUser;
  const currentBlog = await blogServices.getSingleBlog(id);

  if (!currentBlog) {
    throw new Error("Blog not found");
  }
  
  const hasUpdatePermission =loggedUser._id.equals(currentBlog.author);
  
  if (!hasUpdatePermission) {
    const error = new Error("You do not have permission to update this blog");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const result = await blogServices.updateBlog(id, body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: result
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const loggedUserData = await getLoggedUser(req);
  const loggedUser: LoggedUser = loggedUserData as LoggedUser;
  const currentBlog = await blogServices.getSingleBlog(id);

  if (!currentBlog) {
    throw new Error("Blog not found");
  }
  
  const hasDeletePermission =
    loggedUser._id.equals(currentBlog.author) || loggedUser.role === "admin";
  
  if (!hasDeletePermission) {
    const error = new Error("You do not have permission to delete this blog");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }


  const result = await blogServices.deleteBlog(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: result
  });
});

export const blogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
};
