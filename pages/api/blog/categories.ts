import { BlogArticle } from "@api_models/index"
import { BlogCategory } from "@api_models/index"
import { handleSequelizeError } from "@api_utils/general.utils"
import { ensureError } from "@utils/general.utils"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await BlogCategory.findAll({
      attributes: ["name", "id"],
      include: [
        {
          model: BlogArticle,
          attributes: [],
        },
      ],
      group: ["BlogCategory.id"],
    })

    console.log("RESULT", result)

    res.status(200).json(result)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
