import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@api_models/user.model"
import { getToken } from "next-auth/jwt"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      res.status(401)
    }

    const { user_email } = req.query

    const user = await User.findOne({
      where: { email: user_email },
    })

    if (!user) {
      return res.status(404).json({ message: "No user found" })
    }

    return res.status(200).json(user)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
