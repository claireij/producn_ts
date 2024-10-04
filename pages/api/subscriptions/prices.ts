import { NextApiRequest, NextApiResponse } from "next"
import { Subscription } from "@api_models/subscription.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subscriptions = await Subscription.findAll({
      attributes: ["id", "price"],
    })

    res.status(200).json(subscriptions)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
