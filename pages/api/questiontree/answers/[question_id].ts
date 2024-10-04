import { NextApiRequest, NextApiResponse } from "next"
import { Answer } from "@api_models/answer.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { question_id } = req.query

    if (!question_id) {
      return res.status(400).json({ message: "question_id is required" })
    }

    const answers = await Answer.findAll({
      where: {
        parent_question_id: question_id,
        published: true,
      },
    })

    res.status(200).json(answers)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
