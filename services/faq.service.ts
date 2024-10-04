import { Faq, FaqCategory } from "@models/faq"
import { handleAxiosError } from "@utils/general.utils"
import axios from "axios"

export const FaqService = {
  getFaqs: async (): Promise<Array<Faq> | undefined> => {
    try {
      const faqsResponse = await axios.get("/api/faqs")
      return faqsResponse.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to fetch FAQs.")
    }
  },
  getCategories: async (): Promise<Array<FaqCategory> | undefined> => {
    try {
      const faqsCategoriesResponse = await axios.get("/api/faqs/categories")
      return faqsCategoriesResponse.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to fetch FAQ categories.")
    }
  },
}
