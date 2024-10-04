import { SubscriptionEnum } from "./subscription"

export type User = {
  id: string
  gender: GenderEnum
  firstname: string
  lastname: string
  password: string
  retargeting: boolean
  newsletter: boolean
  subscription: SubscriptionEnum
  payment: string
  email: string
  problems_solved: number
  articles_read: number
  longest_streak: number
  level: "beginner" | "master"
  picture: string
  createdAt: string
  subscription_id: string
  old_password?: string
  new_password?: string
  paypalSubscriptionId: string
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  DIVERS = "DIVERS",
}
