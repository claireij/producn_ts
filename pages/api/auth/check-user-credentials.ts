import { NextApiRequest, NextApiResponse } from "next"
import { comparePassword, handleSequelizeError } from "@api_utils/general.utils"
import { User } from "@api_models/user.model"
import { ensureError } from "@utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: [
        "id",
        "email",
        "password",
        "email_confirmed",
        "current_profil_picture",
      ],
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (!user.email_confirmed) {
      return res
        .status(403)
        .json({ message: "Email address not confirmed. Please confirm it." })
    }

    const validPassword = await comparePassword(
      req.body.password,
      user.password,
    )

    if (validPassword) {
      const userData = {
        id: user.id,
        email: user.email,
        image: user.current_profil_picture,
      }
      return res.status(200).json(userData)
    } else {
      return res.status(401).json({ message: "Invalid password" })
    }
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
