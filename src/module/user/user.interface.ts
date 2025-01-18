import { USER_ROLE } from "./user.constants"

export interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  isBlocked: boolean
}

export type TUserRole = keyof typeof USER_ROLE;
