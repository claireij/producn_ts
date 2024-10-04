import { PaypalService } from "@services/paypal.service"
import fetch from "node-fetch"

import { NextApiRequest, NextApiResponse } from "next"
import { UserSubscription } from "@api_models/userSubscription.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id } = req.body

  const paypalUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PAYPAL_HOST_LIVE
      : process.env.PAYPAL_HOST_SANDBOX

  try {
    const activeSubscription = await UserSubscription.findOne({
      where: { user_id: user_id, active: 1 },
    })

    if (!activeSubscription) {
      return res.status(500).json({
        message: "Couldn't find an active subscription for this user.",
      })
    }

    const accessToken = await PaypalService.getPayPalAccessToken()
    const id = activeSubscription.paypal_subscription_id

    const url = `${paypalUrl}/v1/billing/subscriptions/${id}/cancel`

    const response_paypal = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reason: "Customer-requested pause" }),
    })

    if (response_paypal.ok) {
      const result = await UserSubscription.update(
        { active: false },
        {
          where: {
            paypal_subscription_id: activeSubscription.paypal_subscription_id,
          },
        },
      )

      if (result[0] === 0) {
        return res.status(404).json({ message: "Subscription not found" })
      }

      res.status(200).send("Deleted successfully")
    } else if (response_paypal.status === 401) {
      res.status(401).send("Unauthorized")
    } else if (response_paypal.status === 404) {
      res
        .status(404)
        .send(
          "We couldnt find your subscription, please contact our staff via email.",
        )
    } else {
      throw new Error()
    }
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
