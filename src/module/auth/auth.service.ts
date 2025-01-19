import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (payload: IUser) => {
  const { email, name, password, isBlocked } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new Error("User is already Exist try another email or Login!");
  }

  // Setting the ROLE to USER by default
  const user = {
    name: name,
    email: email,
    password: password,
    role: "user",
    isBlocked: isBlocked || false
  };

  const result = await User.create(user);
  return {
    _id: result._id,
    name: result.name,
    email: result.email
  };
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    const error = new Error("User not found");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  // checking if the user is inactive
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    const error = new Error("This user is blocked ! !");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    const error = new Error("Invalid credentials");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d"
  });

  // Logged In USER
  const loggedInUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked
  };
  return { token, loggedInUser };
};

export const AuthService = {
  register,
  login
};
