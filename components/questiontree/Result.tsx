import React, { useEffect } from "react"
import { Button } from "@components/_general/button/Button"
import { ResultModal } from "./ResultModal"
import { useQuery } from "@tanstack/react-query"
import { QuestionTreeService } from "@services/questiontree.service"
import { Loader } from "@components/Loader"
import { UserService } from "@services/user.service"
import { Session } from "next-auth/core/types"

interface ResultInterface {
  resultId: string
  startAgain: () => void
  session: Session | null
}

export const ResultDiv = ({
  startAgain,
  resultId,
  session,
}: ResultInterface) => {
  const {
    data: result,
    isLoading: isLoadingResult,
    isError: isErrorResult,
  } = useQuery({
    queryKey: ["result"],
    queryFn: () => QuestionTreeService.getResultById(resultId),
  })

  const updateUserProgress = async () => {
    if (result && session?.user?.email) {
      await UserService.updateUser({
        email: session.user.email,
        problems_solved: 1,
      })
    }
  }

  useEffect(() => {
    updateUserProgress()
  }, [result, session])

  const body =
    !result || isErrorResult ? (
      <p className="mb-5">
        We are deeply sorry, but this result is not available yet!
      </p>
    ) : (
      <>
        <p
          className="mb-5"
          id="result"
          dangerouslySetInnerHTML={{ __html: result.text }}
        ></p>
        <ResultModal resultId={result.id} userId={session?.user?.id} />
      </>
    )

  return (
    <div>
      <h1 className="mb-5 font-bold">The answer to your problem is...</h1>
      {isLoadingResult ? <Loader /> : body}
      <Button type="primary" onClick={startAgain}>
        Start again
      </Button>
    </div>
  )
}
