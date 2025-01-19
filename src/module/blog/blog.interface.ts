import { Types } from 'mongoose'

export interface IBlog {
  _id?: Types.ObjectId
  title: string
  content: string
  author: Types.ObjectId
  isPublished: boolean
  __v?: number
}
