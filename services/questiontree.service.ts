import axios from "axios"
import { Answer, Question, Result } from "@models/questiontree"
import { handleAxiosError } from "@utils/general.utils"

export const QuestionTreeService = {
  getQuestionById: async (id: string): Promise<Question> => {
    try {
      const response = await axios.get(`/api/questiontree/questions/${id}`)

      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error(`Failed to fetch question with the ID of: ${id}`)
    }
  },

  getAnswers: async (questionId: string): Promise<Array<Answer>> => {
    try {
      const response = await axios.get(
        `/api/questiontree/answers/${questionId}`,
      )
      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error(
        `Failed to fetch answers for the question with the ID of: ${questionId}`,
      )
    }
  },

  getResultById: async (id: string): Promise<Result | null> => {
    try {
      const response = await axios.get(`/api/questiontree/results/${id}`)

      if (response.status === 404 || !response.data) {
        console.warn(`No result found with ID: ${id}`)
        return null
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.warn(`Result with ID ${id} not found`)
        return null
      }

      handleAxiosError(error)
      throw new Error(`Failed to fetch result with the ID of: ${id}`)
    }
  },
}
