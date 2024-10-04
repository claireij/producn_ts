import axios from "axios"
import { Article, BlogCategory } from "@models/blog"
import { handleAxiosError } from "@utils/general.utils"
import { showNotification } from "./notification.service"
import { StatusEnum } from "@models/general"

export type getArticlesParams = {
  page?: number
  categories?: string
  searchTerm?: string
}

export const BlogService = {
  getArticles: async (
    params: getArticlesParams,
  ): Promise<{ count: number; rows: Array<Article> }> => {
    try {
      const reponse = await axios.get("/api/blog/articles", { params: params })

      return reponse.data
    } catch (error) {
      handleAxiosError(error)
      showNotification(
        "Server Error",
        "Could not retrieve articles",
        StatusEnum.ERROR,
      )
      return { count: 0, rows: [] }
    }
  },
  getCategories: async (): Promise<Array<BlogCategory>> => {
    try {
      const response = await axios.get("/api/blog/categories")

      return response.data
    } catch (error) {
      handleAxiosError(error)
      showNotification(
        "Server Error",
        "Could not retrieve categories",
        StatusEnum.ERROR,
      )
      return []
    }
  },
}
