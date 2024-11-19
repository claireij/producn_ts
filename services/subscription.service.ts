import { SubscriptionPrice } from "@models/subscription"
import { handleAxiosError } from "@utils/general.utils"
import axios from "axios"

export const SubscriptionService = {
  getSubscriptionPrices: async (): Promise<Array<SubscriptionPrice>> => {
    try {
      const prices = await axios.get("/api/subscriptions")
      return prices.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Could not retrieve the subscription prices.")
    }
  },
}
