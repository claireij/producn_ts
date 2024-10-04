import { User } from "@api_models/user.model"
import { handleSequelizeError, hashPassword } from "@api_utils/general.utils"
import { ensureError } from "@utils/general.utils"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const {
        gender,
        firstname,
        lastname,
        email,
        password,
        retargeting,
        newsletter,
        emailConfirmationString,
      } = req.body

      if (!password) {
        return res.status(400).json({ message: "Password is required." })
      }

      const hashedPassword = await hashPassword(password)

      if (!hashedPassword) {
        return res
          .status(500)
          .json({ message: "Failed to hash the password. Please try again." })
      }

      const newUser = await User.create({
        gender,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        retargeting,
        newsletter,
        email_confirmation_string: emailConfirmationString,
      })

      res.status(201).json(newUser)
    } catch (err) {
      const error = ensureError(err)
      return handleSequelizeError(error, res)
    }
  }
}
