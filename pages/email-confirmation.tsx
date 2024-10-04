import { Layout } from "@components/Layout"
import { Button } from "@components/_general/button/Button"
import { UserService } from "@services/user.service"
import { useQuery } from "@tanstack/react-query"
import { getQueryString } from "@utils/general.utils"
import { useRouter } from "next/router"

export default function Post() {
  const router = useRouter()

  const emailConfirmationString = getQueryString(
    router.query.emailConfirmationString,
  )

  const {
    data: emailConfirmation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["emailConfirmation", emailConfirmationString],
    queryFn: () =>
      UserService.confirmEmailAddress({
        emailConfirmationString: emailConfirmationString,
      }),
  })

  return (
    <Layout title="Email confirmation">
      <div>
        <p className="mb-5">
          {isLoading && "Trying to confirm your email address"}
          {isError &&
            "There was an error confirming your email address, please contact our staff."}
          {emailConfirmation && "Thank you for confirming your email address!"}
        </p>

        <Button type="primary" href="/signin">
          Sign in now and get started!
        </Button>
      </div>
    </Layout>
  )
}
