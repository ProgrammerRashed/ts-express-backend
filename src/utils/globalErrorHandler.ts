import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: err.message,
    test: "TestData"
  });
};

export const errorRouteHandler = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  res.status(StatusCodes.NOT_FOUND).send({
    success: false,
    message: "Route not found"
  });
};
