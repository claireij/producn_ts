import { Button } from "@components/_general/button/Button"
import { useSession, signOut } from "next-auth/react"

export const LoginButton = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (session) {
    return (
      <div className="my-5">
        <Button type="primary" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 my-5">
      <Button href="/registration">Register</Button>

      <Button type="primary" href="/signin">
        Sign in
      </Button>
    </div>
  )
}
