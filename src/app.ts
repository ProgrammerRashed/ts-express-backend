import express, { Request, Response } from "express";
import userRouter from "./module/user/user.router";

const app = express();
app.use(express.json());
app.use(userRouter);

app.get("/health", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server is up and running"
  });
});

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).send({
    success: false,
    message: error.message
  });
});
export default app;
