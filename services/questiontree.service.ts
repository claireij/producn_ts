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

  getResult: async (resultIds: Array<string>): Promise<Result | null> => {
    try {
      const response = await axios.post(`/api/questiontree/results/${resultIds.join("")}`, {
        resultIds,
      })

      if (!response.data) {
        return null
      }

      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error(`Failed to fetch or generate result for path: ${resultIds.join("")}`)
    }
  },
}
