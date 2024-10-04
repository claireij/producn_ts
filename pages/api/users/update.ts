import { Sequelize } from "sequelize"
import { handleSequelizeError, hashPassword } from "@api_utils/general.utils.ts"
import { ensureError, getCurrentDateAndTime } from "@utils/general.utils.tsx"
import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@api_models/user.model.ts"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const date = getCurrentDateAndTime()
  const {
    email,
    password,
    articles_read,
    problems_solved,
    longest_streak,
    ...restOfBody
  } = req.body

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required to update the user" })
  }

  try {
    const updatingValues = { ...restOfBody, updatedAt: date }

    if (password) {
      const hashedPassword = await hashPassword(password)
      updatingValues.password = hashedPassword
    }

    if (typeof problems_solved === "number" && problems_solved > 0) {
      updatingValues.problems_solved = Sequelize.literal(
        `problems_solved + ${problems_solved}`,
      )
    }

    if (typeof articles_read === "number" && articles_read > 0) {
      updatingValues.articles_read = Sequelize.literal(
        `articles_read + ${articles_read}`,
      )
    }

    if (longest_streak) {
      updatingValues.longest_streak = longest_streak
    }

    const result = await User.update(updatingValues, {
      where: { email },
      returning: true,
    })

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const updatedUser = await User.findOne({ where: { email } })

    res.status(200).json(updatedUser)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
