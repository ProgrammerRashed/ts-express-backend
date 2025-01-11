import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router();
// ALL READ ROUTES
userRouter.get("/users", userController.getAllUser);
userRouter.get("/users/:id", userController.getUser);
// ALL WRITE ROUTES
userRouter.put("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);
// REGISTER ROUTE
userRouter.post("/register", userController.createUser);

export default userRouter;
