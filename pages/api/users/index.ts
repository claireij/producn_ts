import { User } from "@api_models/user.model"
import { handleSequelizeError, hashPassword } from "@api_utils/general.utils"
import { ensureError, getCurrentDateAndTime } from "@utils/general.utils"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { Sequelize } from "sequelize"

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

  if (req.method === "PATCH") {
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
}
