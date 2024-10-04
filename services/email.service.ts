import { handleAxiosError } from "@utils/general.utils"
import axios from "axios"

export const EmailService = {
  sendEmailVerificationEmail: ({
    userData,
    emailConfirmationString,
  }: {
    userData: { firstname: string; email: string }
    emailConfirmationString: string
  }) => {
    try {
      axios
        .post("/api/emails/email-verification", {
          firstname: userData.firstname,
          email: userData.email,
          emailConfirmationString: emailConfirmationString,
        })
        .then((response) => {
          if (response.status == 200) {
            alert("Email sent!")
          }
        })
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to send verification email.")
    }
  },
  sendDeletionConfirmationEmail: async (email: string) => {
    try {
      const response = axios.post("/api/users/delete-confirmation-email", {
        params: { email },
      })
      return response
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to send confirmation email.")
    }
  },
}
