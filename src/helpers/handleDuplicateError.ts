/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"
import sendErrorResponse from "../utils/sendErrorResponse"

export const handlerDuplicateError = (err: any, res: Response) => {
    sendErrorResponse(res, err)

} 