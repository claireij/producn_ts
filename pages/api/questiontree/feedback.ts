import { NextApiRequest, NextApiResponse } from "next"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"
import { ResultFeedback } from "@api_models/resultFeedback.model"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { resultId, rating, explanation, userId } = req.body

    if (!resultId || !userId) {
      return res
        .status(400)
        .json({ message: "resultId and userId are required" })
    }

    if (req.method === "POST") {
      const existingFeedback = await ResultFeedback.findAndCountAll({
        where: { result_id: resultId, user_id: userId },
      })

      if (existingFeedback.count >= 3) {
        return res
          .status(400)
          .json({
            message: "You have already submitted feedback for this result",
          })
      }

      const newResultFeedback = await ResultFeedback.create({
        result_id: resultId,
        rating,
        ...(explanation && { explanation }),
        user_id: userId,
      })

      return res.status(201).json(newResultFeedback)
    }

    return res.status(405).json({ message: "Method not allowed" })
  } catch (err) {
    const error = ensureError(err)
    console.log(error)
    return handleSequelizeError(error, res)
  }
}
