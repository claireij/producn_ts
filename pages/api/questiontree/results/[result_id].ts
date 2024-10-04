import { NextApiRequest, NextApiResponse } from "next"
import { Result } from "@api_models/result.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { result_id } = req.query

    if (!result_id) {
      return res.status(400).json({ message: "result_id is required" })
    }

    const result = await Result.findOne({
      where: {
        number: result_id,
      },
    })

    if (!result) {
      return res.status(404).json({ message: "Result not found" })
    }

    res.status(200).json(result)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
