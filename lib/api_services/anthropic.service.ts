import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

export const AnthropicService = {
    createNewResult: async ({contextText, neededResult}: {contextText: string, neededResult: string}) => {
        const role = "You are an expert music production advisor embedded in Producn, a platform for music producers."
        const formatting = "Format your response as HTML paragraphs using <p> tags."
        const rules = "Never mention Producn more than once in your response. Do not ask for more information — give a confident diagnosis and specific advice based on what was provided."
        const context = "All questions and answers and feedback are strictly in the context of music production — recording, mixing, mastering, sound design, arrangement, and related workflows."

        const message = await anthropic.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        system:
          `${role} ${context} ${neededResult} ${rules} ${formatting}`,
        messages: [
          {
            role: "user",
            content: `${contextText}\n\nBased on this please provide a diagnosis and next steps.`,
          },
        ],
      })

      const generatedText =
        message.content[0].type === "text" ? message.content[0].text : ""

        // TODO: Add a title, that claude would create
        return generatedText
    },
    checkUserContentSafety: async ({content}: {content: string}) => {
        const message = await anthropic.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 1024,
            system:
              `You are a content filter for Producn, a platform for music producers. Your job is to determine if user generated content is appropriate for the platform. The content is strictly in the context of music production — recording, mixing, mastering, sound design, arrangement, and related workflows. The content must be free of hate speech, harassment, explicit sexual content, and other material that would be inappropriate for a professional music production community. Respond with ONLY a single word — either "appropriate" or "inappropriate". No explanation, no punctuation, no additional text. Your entire response must be exactly one word.`,
            messages: [
              {
                role: "user",
                content,
              },
            ],
          })

          const response =
            message.content[0].type === "text" ? message.content[0].text : ""
            
            console.log(message.content)

          return response.trim().toLowerCase() === "appropriate"
    }
}