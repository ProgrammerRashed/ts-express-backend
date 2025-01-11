import { Response } from "express";
import { ISendResponse } from "../interfaces/interfaces";

const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data
  });
};

export default sendResponse;
