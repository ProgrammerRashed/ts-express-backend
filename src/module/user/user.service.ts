import { IUser } from "./user.interface";
import User from "./user.model";

// GET METHODS
const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const getUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// POST METHODS
const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data);
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser
};
