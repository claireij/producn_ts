import { signOut } from "next-auth/react"
import { Button } from "@components/_general/button/Button"

interface AccessDeniedInterface {
  loggedIn?: boolean
}

export const AccessDenied = ({ loggedIn = false }: AccessDeniedInterface) => {
  return (
    <>
      <h1>Access Denied</h1>

      {loggedIn ? (
        <>
          <p className="mb-5">You must be signed out to view this page</p>
          <Button type="primary" onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <p className="mb-5">You must be signed in to view this page</p>
          <Button type="primary" href="/signin">
            Sign in here
          </Button>
        </>
      )}
    </>
  )
}
