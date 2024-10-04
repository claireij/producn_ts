import { ReactNode } from "react"

export type SubscriptionPrice = {
  price: number
  id: string
}

export type CancelReason = {
  reason: string
  description: string
  button: ReactNode
}

export enum SubscriptionEnum {
  BASIC_MONTHLY = "Basic monthly",
  BASIC_YEARLY = "Basic yearly",
  PRO_MONTHLY = "Pro monthly",
  PRO_YEARLY = "Pro yearly",
}
