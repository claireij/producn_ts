import { NextApiRequest, NextApiResponse } from "next"
import { ensureError } from "@utils/general.utils"
import { handleSequelizeError, sanitizeInput } from "@api_utils/general.utils"
import { ResultFeedback } from "@api_models/resultFeedback.model"
import { col, fn, literal, Op } from "sequelize"
import { AnthropicService } from "lib/api_services/anthropic.service"
import { Result } from "@api_models/result.model"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO: all routes of the API need to be protected
//   const authHeader = req.headers.get("authorization")
//   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const resultsWithBadFeedback = await ResultFeedback.findAll({
      attributes: ["result_id", [fn("COUNT", col("id")), "bad_feedback_count"]],
      where: {
        rating: false,
        createdAt: {
          [Op.gte]: sevenDaysAgo,
        },
      },
      group: ["result_id"],
      having: literal("COUNT(id) >= 1"),
      raw: true,
      // TODO: not happy with the typecast here!
    }) as unknown as Array<{ result_id: number; bad_feedback_count: number }>

    for (const result of resultsWithBadFeedback) {
        if (result.bad_feedback_count < 3) continue

        const oldResult = await Result.findOne({where: {id: result.result_id}})

        if(!oldResult)  {
            console.error(`Result with id ${result.result_id} not found, skipping...`)
            continue
        }

        if(oldResult.createdAt && oldResult.createdAt > sevenDaysAgo) {
            console.log(`Result ${result.result_id} is too new, skipping...`)
            continue
        }

        const revisionCount = await Result.count({ where: { number: oldResult.number } });

        if(revisionCount >= 3) {
            // TODO: new feature logic to notify team to manually check this
            console.log(`Result ${result.result_id} has already been revised 3 times, skipping...`)
            continue
        }

        const feedbackExplanations = await ResultFeedback.findAll({
            where: {
                result_id: result.result_id,
                rating: false,
                createdAt: {
                    [Op.gte]: sevenDaysAgo,
                },
            },
            attributes: ['explanation']
        })

        const arrayOfExplanations = feedbackExplanations.map(feedback => feedback.explanation).filter(Boolean)

        const sanitizedExplanations = sanitizeInput({rawInput: arrayOfExplanations.join(". ")})

        if(sanitizedExplanations.flagged) {
            console.log(`Feedback for result ${result.result_id} failed sanitization, skipping...`)
            continue
        }

        const isUserFeedbackSafe = await AnthropicService.checkUserContentSafety({content: sanitizedExplanations.sanitized})

        if (!isUserFeedbackSafe) {
            // TODO: this user should be flagged for malicious activity, and if this keeps happening, they should be banned
            console.log(`Feedback for result ${result.result_id} is not safe, skipping...`)
            continue
        }

        const claudeGeneratedResult = await AnthropicService.createNewResult({contextText: `Here is the user's feedback on a specific result, as well as the old result. Please rewrite this result to address the user's feedback and improve it. User feedback: ${sanitizedExplanations}. Old result text: ${oldResult.text}. Don't explain, what you are changing, just rewrite the result, in the same format as the old result, but consider the users feedback.`, neededResult: "Based on the old result and the users feedback, provide an updated version of the result, while maintaining the same format as the old result."})

        // TODO: there should be some output validation, to prevent Claude from creating any result, that isn't structured correctly + we need a clear schema for any result
        await Result.create({
        text: claudeGeneratedResult,
        number: oldResult.number,
      })
    }  
    
    return res.status(200).json({ message: "Feedback analysis completed successfully" })
  } catch (err) {
    const error = ensureError(err)
    return handleSequelizeError(error, res)
  }
}
