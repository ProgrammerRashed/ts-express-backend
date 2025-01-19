/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import config from "../config";

type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: any;
  stack: string | null;
};


const sendErrorResponse = (err: any, res: Response): void => {
  const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
  const message = err.message || "An unexpected error occurred";
  const errorDetails = {
    err: config.nodeEnv === "development" ? err.stack : null,
    message: err.message,
    name: err.name
  };

  const response: TErrorResponse = {
    success: false,
    message,
    statusCode,
    error: errorDetails,
    stack: config.nodeEnv === "development" ? err.stack : null,
  };

  res.status(statusCode).json(response);
};


export default sendErrorResponse