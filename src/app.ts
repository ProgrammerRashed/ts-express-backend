import express, { Request, Response } from "express";
import userRouter from "./module/user/user.router";
import {
  errorRouteHandler,
  globalErrorHandler
} from "./utils/globalErrorHandler";

const app = express();
app.use(express.json());
app.use(userRouter);

app.get("/health", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server is up and running"
  });
});

// 404 route handler
app.use(errorRouteHandler);
app.use(globalErrorHandler);

export default app;
