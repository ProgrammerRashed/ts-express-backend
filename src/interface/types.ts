import { ObjectId } from "mongodb";

export type LoggedUser = {
  _id: ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  __v: number;
};

export type MongoData ={
    _id: ObjectId;
    __v: number;
}