import axios from "axios"
import { User } from "@models/user"
import { ensureError, handleAxiosError } from "@utils/general.utils.tsx"

export const UserService = {
  createUser: async (
    userData: Partial<User>,
    emailConfirmationString: string,
  ) => {
    try {
      const response = await axios.post("/api/users", {
        gender: userData.gender,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        password: userData.password,
        retargeting: userData.retargeting,
        newsletter: userData.newsletter,
        subscription_id: userData.subscription_id,
        payment: userData.payment,
        emailConfirmationString,
      })

      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("We couldn't register you, please contact our staff.")
    }
  },

  updateUser: async (userData: Partial<User>) => {
    if (!userData.email) throw new Error("Missing the email")

    if (userData.new_password) {
      if (!userData.old_password) throw new Error("Missing the old password")
      try {
        await UserService.checkUserCredentials(
          userData.old_password,
          userData.email,
        )
      } catch (error) {
        handleAxiosError(error)
        throw new Error("The password you entered is not correct")
      }
    }

    try {
      const response = await axios.patch("/api/users", {
        ...(userData.email && { email: userData.email }),
        ...(userData.gender && { gender: userData.gender }),
        ...(userData.firstname && { firstname: userData.firstname }),
        ...(userData.lastname && { lastname: userData.lastname }),
        ...(userData.password && { password: userData.password }),
        ...(userData.retargeting !== undefined && {
          retargeting: userData.retargeting,
        }),
        ...(userData.newsletter !== undefined && {
          newsletter: userData.newsletter,
        }),
        ...(userData.subscription && { subscription: userData.subscription }),
        ...(userData.subscription_id && {
          subscription_id: userData.subscription_id,
        }),
        ...(userData.payment && { payment: userData.payment }),
        ...(userData.problems_solved && {
          problems_solved: userData.problems_solved,
        }),
        ...(userData.articles_read && {
          articles_read: userData.articles_read,
        }),
        ...(userData.new_password && { password: userData.new_password }),
        ...(userData.subscription_id && {
          subscription_id: userData.subscription_id,
        }),
      })
      return response.data
    } catch (error) {
      handleAxiosError(error)
      throw new Error("Failed to update user.")
    }
  },
  getUser: async (email: string) => {
    try {
      const response = await axios.get(`/api/users/${email}`)
      return response.data
    } catch (error) {
      handleAxiosError(error)
    }
  },
  checkIfUserExists: async (email: string) => {
    try {
      const response = await axios.get(`/api/auth/check-user/${email}`)
      return response.data
    } catch (error) {
      handleAxiosError(error)
    }
  },
  checkUserCredentials: async (password: string, email: string) => {
    try {
      const response = await axios.post("/api/auth/check-user-credentials", {
        password,
        email,
      })

      return response
    } catch (error) {
      handleAxiosError(error)
      throw error
    }
  },
  confirmEmailAddress: async ({
    emailConfirmationString,
  }: {
    emailConfirmationString: string
  }) => {
    try {
      const response = await axios.get(
        `/api/users/confirm-email/${emailConfirmationString}`,
      )

      return response.data
    } catch (err) {
      const error = ensureError(err)
      handleAxiosError(error)
      return null
    }
  },
}
