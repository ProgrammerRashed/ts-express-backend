import { Response } from "express";
import sendErrorResponse from "../utils/sendErrorResponse";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleCastError = (err: any, res: Response) => {
    sendErrorResponse(res, err)
}