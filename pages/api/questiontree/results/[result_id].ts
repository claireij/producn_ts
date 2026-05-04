import { NextApiRequest, NextApiResponse } from "next"
import Anthropic from "@anthropic-ai/sdk"
import { Result } from "@api_models/result.model"
import { Answer } from "@api_models/answer.model"
import { Question } from "@api_models/question.model"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError } from "@api_utils/general.utils"

const anthropic = new Anthropic()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { result_id } = req.query

    if (!result_id) {
      return res.status(400).json({ message: "result_id is required" })
    }

    if (req.method === "GET") {
      const result = await Result.findOne({ where: { number: result_id } })
      if (!result) {
        return res.status(404).json({ message: "Result not found" })
      }
      return res.status(200).json(result)
    }

    if (req.method === "POST") {
      const { resultIds } = req.body as { resultIds: string[] }

      if (!resultIds || !Array.isArray(resultIds) || resultIds.length === 0) {
        return res.status(400).json({ message: "resultIds array is required" })
      }

      const existing = await Result.findOne({ where: { number: result_id } })
      if (existing) {
        return res.status(200).json(existing)
      }

      const qaContext = await Promise.all(
        resultIds.map(async (id) => {
          const answer = await Answer.findOne({ where: { id } })
          if (!answer) return null
          const question = await Question.findOne({
            where: { id: (answer as any).parent_question_id },
          })
          return {
            question: (question as any)?.text ?? "",
            answer: (answer as any).text ?? "",
          }
        }),
      )

      const validContext = qaContext.filter(Boolean) as {
        question: string
        answer: string
      }[]

      const contextText = validContext
        .map((item, i) => `Step ${i + 1}:\nQ: ${item.question}\nA: ${item.answer}`)
        .join("\n\n")

      const message = await anthropic.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system:
          "You are an expert music production advisor embedded in Producn, a platform for music producers. All questions and answers are strictly in the context of music production — recording, mixing, mastering, sound design, arrangement, and related workflows. Based on the Q&A session, provide a clear diagnosis of the producer's problem and concrete, actionable next steps tailored to music production. Never mention Producn more than once in your response. Do not ask for more information — give a confident diagnosis and specific advice based on what was provided. Format your response as HTML paragraphs using <p> tags.",
        messages: [
          {
            role: "user",
            content: `Here is the user's diagnostic Q&A session:\n\n${contextText}\n\nPlease provide a diagnosis and next steps.`,
          },
        ],
      })

      const generatedText =
        message.content[0].type === "text" ? message.content[0].text : ""

      const newResult = await Result.create({
        text: generatedText,
        number: result_id,
      })

      return res.status(201).json(newResult)
    }

    return res.status(405).json({ message: "Method not allowed" })
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
