import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleValidationError = (err: any, res: Response) => {
    const issues = Object.values(err.errors).map((item: any) => {
        return {
            name: item.name,
            path: item.path,
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