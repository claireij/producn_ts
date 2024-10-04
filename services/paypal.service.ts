import axios from "axios"
import { User } from "@models/user"
import { handleAxiosError } from "@utils/general.utils"

export const PaypalService = {
  createSubscription: async ({
    paypalSubscriptionId,
    user,
  }: {
    paypalSubscriptionId: string
    user: Partial<User>
  }) => {
    try {
      await axios.post("/api/userSubscriptions/create", {
        user_id: user.id,
        paypal_subscription_id: paypalSubscriptionId,
        subscription_id: user.subscription_id,
        active: "1",
      })
    } catch (error) {
      handleAxiosError(error)
      throw new Error(
        "We couldn't create your subscription, please contact our staff",
      )
    }
  },

  getSubscription: async (userId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/userSubscriptions/getActiveSubscription/${userId}`,
      )
      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to fetch subscription")
    }
  },
  pauseSubscription: async (userId: string) => {
    try {
      if (!userId) throw new Error("Missing user ID.")
      const response = await axios.post("/api/paypal/pause", {
        user_id: userId,
      })
      return response
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed canceling the subscription")
    }
  },
  getPayPalAccessToken: async () => {
    try {
      const paypalUrl =
        process.env.NODE_ENV === "production"
          ? process.env.PAYPAL_HOST_LIVE
          : process.env.PAYPAL_HOST_SANDBOX
      const client_id = process.env.PAYPAL_CLIENT_ID || ""
      const client_secret = process.env.PAYPAL_CLIENT_SECRET || ""

      const options = {
        url: `${paypalUrl}/v1/oauth2/token`,
        method: "POST",
        data: "grant_type_client_credentials",
        headers: {
          Accept: "application/json",
          "Accept-Language": "en_US",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: client_id,
          password: client_secret,
        },
        params: {
          grant_type: "client_credentials",
        },
      }
      const { data } = await axios(options)

      return data.access_token
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed fetching the paypal access token.")
    }
  },
}
