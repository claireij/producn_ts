import { NextApiRequest, NextApiResponse } from "next"
import { sequelize } from "../sequelize"
import { FaqCategory } from "@api_models/faqCategory.model"
import { Faq } from "@api_models/faq.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await FaqCategory.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("COUNT", sequelize.col("faqs.id")), "faq_count"],
      ],
      include: [
        {
          model: Faq,
          attributes: [],
        },
      ],
      group: ["FaqCategory.id"],
    })

    res.status(200).json(categories)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
