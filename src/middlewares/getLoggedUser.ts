import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../module/user/user.model";
import config from "../config";

const getLoggedUser = async (req: Request) => {
  const token = req.headers.authorization?.split(" ")[1];
  // checking if the token is missing

  if (!token) {
    return {
      success: false,
      message: "This user is not found !"
    };
  }

  // checking if the given token is valid
  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "This user is not found !"
    };
  }
  return user;
};

export default getLoggedUser;
