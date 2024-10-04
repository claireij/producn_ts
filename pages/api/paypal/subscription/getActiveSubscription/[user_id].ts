import { NextApiRequest, NextApiResponse } from "next"
import { UserSubscription } from "@api_models/userSubscription.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.query

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" })
    }

    const subscription = await UserSubscription.findOne({
      where: { user_id: user_id, active: 1 },
    })

    if (!subscription) {
      return res.status(404).json({ message: "No active subscription found" })
    }

    return res.status(200).json(subscription)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
