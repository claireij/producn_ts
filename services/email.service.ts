import { handleAxiosError } from "@utils/general.utils"
import axios from "axios"

export const EmailService = {
  sendEmailVerificationEmail: async ({
    userData,
    emailConfirmationString,
  }: {
    userData: { firstname: string; email: string }
    emailConfirmationString: string
  }) => {
    try {
      const response = await axios
        .post("/api/emails/email-verification", {
          firstname: userData.firstname,
          email: userData.email,
          emailConfirmationString: emailConfirmationString,
        })
        
        return response
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to send verification email.")
    }
  },
  sendDeletionConfirmationEmail: async (email: string) => {
    try {
      const response = await axios.post("/api/users/delete-confirmation-email", {
        params: { email },
      })
      return response
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to send confirmation email.")
    }
  },
}
