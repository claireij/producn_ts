import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@api_models/user.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const emailConfirmationString = req.query
      .email_confirmation_string as string

    if (!emailConfirmationString) {
      return res
        .status(400)
        .json({ message: "Missing email confirmation string" })
    }

    const user = await User.findOne({
      where: { email_confirmation_string: emailConfirmationString },
    })

    if (!user) {
      return res.status(404).json({ message: "No user found" })
    }

    const resultUpdate = await user.update({ email_confirmed: true })

    if (!resultUpdate) {
      return res.status(500).json({ message: "Could not update the user." })
    }

    return res
      .status(200)
      .json({ message: "Email confirmed successfully", user: resultUpdate })
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
