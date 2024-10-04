import { NextApiRequest, NextApiResponse } from "next"
import { Faq } from "@api_models/index"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const faqs = await Faq.findAll()

    if (faqs.length === 0) {
      return res.status(404).json({ message: "No faqs found" })
    }

    res.status(200).json(faqs)
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
