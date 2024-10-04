import { NextApiRequest, NextApiResponse } from "next"
import { Question } from "@api_models/question.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { question_id } = req.query

    if (!question_id) {
      return res.status(400).json({ message: "question_id is required" })
    }

    const question = await Question.findOne({
      where: {
        id: question_id,
      },
    })

    if (!question) {
      return res.status(404).json({ message: "Question not found" })
    }

    res.status(200).json(question)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
