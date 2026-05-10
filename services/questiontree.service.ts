import axios from "axios"
import { Answer, Question, Result, ResultFeedback } from "@models/questiontree"
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
      const response = await axios.post(
        `/api/questiontree/results/${resultIds.join("")}`,
        {
          resultIds,
        },
      )

      if (!response.data) {
        return null
      }

      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error(
        `Failed to fetch or generate result for path: ${resultIds.join("")}`,
      )
    }
  },
  createFeedback: async ({
    resultId,
    userId,
    rating,
    explanation,
  }: ResultFeedback) => {
    try {
      await axios.post(`/api/questiontree/feedback`, {
        resultId: resultId,
        rating: rating,
        explanation: explanation,
        userId: userId,
      })
    } catch (error) {
      const axiosErrorResult = handleAxiosError(error)

      if (axiosErrorResult) {
        throw new Error(
          `Failed to send feedback for result ID ${resultId}: ${axiosErrorResult.message} (status: ${axiosErrorResult.status})`,
        )
      }

      throw new Error(
        `Failed to send feedback for result with the ID of: ${resultId}`,
      )
    }
  },
}
