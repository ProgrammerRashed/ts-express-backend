export interface IUser {
  name: string;
  email: string;
  age: number;
  photo?: string;
  role: "ADMIN" | "USER";
  userStatus: "active" | "inactive";
  password: string;
}
