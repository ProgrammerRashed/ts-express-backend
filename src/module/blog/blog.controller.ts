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
  if (!loggedUserData || !(loggedUserData as LoggedUser)._id) {

    throw new Error("User not authenticated or invalid user data");
  }
  const loggedUser: LoggedUser = loggedUserData as LoggedUser;
  const blogDetails = {
    title: req.body.title,
    content: req.body.content,
    author: loggedUser?._id,
    isPublished: true
  };
  const result:IBlog = await blogServices.createBlog(blogDetails);
  const cleanResult:IBlog= {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
    isPublished: result.isPublished,
  };

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog Created Successfully',
    data: cleanResult,
  })
})

const getBlogs = async (req: Request, res: Response) => {
  try {
    const result = await blogServices.getBlogs(req.query);

    res.send({
      success: true,
      message: "Tours get successfully",
      result
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};

const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await blogServices.getSingleBlog(id);

    res.send({
      success: true,
      message: "Tour get successfully",
      result
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await blogServices.updateBlog(id, body);

    res.send({
      success: true,
      message: "Tour updated successfully",
      result
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};
const deleteBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await blogServices.deleteBlog(id);

    res.send({
      success: true,
      message: "Tour deleted successfully",
      result
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error
    });
  }
};

export const blogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog
};
