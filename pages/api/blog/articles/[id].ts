import { NextApiRequest, NextApiResponse } from "next"
import { BlogArticle } from "@api_models/blogArticle.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ message: "id is required" })
    }

    const article = await BlogArticle.findOne({
      where: {
        id: id,
      },
    })

    if (!article) {
      return res.status(404).json({ message: "No article found for this id" })
    }

    res.status(200).json(article)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
