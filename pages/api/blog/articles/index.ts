import { NextApiRequest, NextApiResponse } from "next"
import { BlogArticle } from "@api_models/blogArticle.model"
import { Op } from "sequelize"
import { maxArticlesPerPage } from "consts"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { categories, searchTerm, page } = req.query

    const pageInt = page ? parseInt(page?.toString()) : 1

    const queryOptions = {
      where: {},
      offset: pageInt * maxArticlesPerPage - maxArticlesPerPage,
      limit: maxArticlesPerPage,
    }

    if (searchTerm) {
      queryOptions.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { content: { [Op.like]: `%${searchTerm}%` } },
        ],
      }
    }

    if (categories) {
      const categoriesArray =
        typeof categories === "string" ? categories.split(",") : categories
      queryOptions.where = {
        ...queryOptions.where,
        category_id: {
          [Op.in]: categoriesArray,
        },
      }
    }

    const articles = await BlogArticle.findAndCountAll(queryOptions)

    res.status(200).json(articles)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
