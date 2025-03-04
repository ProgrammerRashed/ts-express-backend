/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";


export const handlerZodError = (err: any, res: Response) => {
    const issues = err.issues.map((item: any) => {
        return {
            path: item.path.join('>'),
            message: item.message
        }
    });
  res.status(StatusCodes.BAD_REQUEST).json({
         success: false,
         message: err.message,
         statusCode: StatusCodes.BAD_REQUEST,
         error: {
             issues, err 
         },
         stack: config.nodeEnv === "development" ? err.stack : null,
     })
 

}