import React, { useEffect } from "react"
import { Button } from "@components/_general/button/Button"
import { ResultModal } from "./ResultModal"
import { useQuery } from "@tanstack/react-query"
import { QuestionTreeService } from "@services/questiontree.service"
import { Loader } from "@components/Loader"
import { UserService } from "@services/user.service"
import { Session } from "next-auth"

interface ResultInterface {
  resultId: Array<string>
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
    queryKey: ["result", resultId],
    queryFn: () => QuestionTreeService.getResult(resultId),
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

  if (!session?.user) return <p>User missing</p>

  const body =
    !result || isErrorResult ? (
      <p className="mb-5">
        We are deeply sorry, but this result is not available yet!
      </p>
    ) : (
      <div className="border-l-2 border-blue pl-4">
        <p
          className="mb-5"
          id="result"
          dangerouslySetInnerHTML={{ __html: result.text }}
        ></p>
      </div>
    )

  return (
    <div>
      <div className="border-b-2 border-grey-200 mb-5 pb-5">
        <h2 className="uppercase text-xs text-blue">
          The answer to your problem is...
        </h2>
        {/* TODO: add result titles */}
        <h1 className="mb-7">Some random result title</h1>
        {isLoadingResult ? <Loader /> : body}
      </div>

      <div className="flex justify-between items-end">
        {result && (
          <ResultModal resultId={result.id} userId={session?.user?.id} />
        )}

        <div>
          <Button type="primary" onClick={startAgain}>
            Start again
          </Button>
        </div>
      </div>
    </div>
  )
}
