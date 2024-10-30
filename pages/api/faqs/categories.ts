import { NextApiRequest, NextApiResponse } from "next"
import { FaqCategory } from "@api_models/index"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await FaqCategory.findAll({
      attributes: [
        "id",
        "name",
      ],
      group: ["FaqCategory.id"],
    })

    res.status(200).json(categories)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
