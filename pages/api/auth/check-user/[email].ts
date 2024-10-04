import { User } from "@api_models/user.model"
import { handleSequelizeError } from "@api_utils/general.utils"
import { ensureError } from "@utils/general.utils"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.query

    const user = await User.findOne({
      where: { email: email },
      attributes: ["email"],
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
