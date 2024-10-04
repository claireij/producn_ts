import bcrypt from "bcryptjs"

import {
  DatabaseError,
  ForeignKeyConstraintError,
  TimeoutError,
  UniqueConstraintError,
  ValidationError,
} from "sequelize"
import { NextApiResponse } from "next"

export const comparePassword = async (password: string, hash: string) => {
  const res = await bcrypt.compare(password, hash)

  if (!res) {
    throw new Error("Invalid password")
  }

  return res
}
export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)

    return await bcrypt.hash(password, salt)
  } catch (error) {
    console.log(error)
  }

  return null
}

export const handleSequelizeError = (error: Error, res: NextApiResponse) => {
  console.error("Sequelize error:", error)

  if (error instanceof ValidationError) {
    const messages = error.errors.map((err) => err.message)
    return res.status(400).json({ error: "Validation error", messages })
  }

  if (error instanceof DatabaseError) {
    return res
      .status(500)
      .json({ error: "Database error", message: error.message })
  }

  if (error instanceof UniqueConstraintError) {
    return res
      .status(409)
      .json({ error: "Unique constraint violation", message: error.message })
  }

  if (error instanceof ForeignKeyConstraintError) {
    return res
      .status(409)
      .json({ error: "Foreign key constraint error", message: error.message })
  }

  if (error instanceof TimeoutError) {
    return res
      .status(504)
      .json({ error: "Database timeout", message: error.message })
  }

  return res
    .status(500)
    .json({ error: "Internal server error", message: error.message })
}
