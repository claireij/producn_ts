import { NextApiRequest, NextApiResponse } from "next"
import { UserSubscription } from "@api_models/userSubscription.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "POST") {
    try {
      const { user_id, paypal_subscription_id, active, subscription_id } =
        req.body
  
      const result = await UserSubscription.create({
        user_id,
        paypal_subscription_id,
        active,
        subscription_id,
      })
  
      res.status(201).json(result)
    } catch (err) {
      const error = ensureError(err)
      return handleSequelizeError(error, res)
    }
  }
  
}
