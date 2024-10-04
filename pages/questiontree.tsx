import { Layout } from "@components/Layout"
import {
  newQuestion,
  returnToPreviousQuestion,
} from "../utils/questiontree/questiontreeStackScript"
import { useState } from "react"
import { Middle } from "@components/questiontree/Middle"
import { ResultDiv } from "@components/questiontree/Result"
import { Start } from "@components/questiontree/Start"
import { Question } from "@models/questiontree"
import { QuestionTreeService } from "@services/questiontree.service"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { firstQuestionId } from "consts"
import { PaypalService } from "@services/paypal.service"

export default function QuestionTree() {
  const [showStart, setShowStart] = useState(true)
  const [questionId, setQuestionId] = useState<Question["id"]>(firstQuestionId)
  const [resultId, setResultId] = useState<Array<Question["id"]>>([])
  const [showResult, setShowResult] = useState(false)

  const { data: session, status } = useSession()

  const {
    data: question,
    isLoading: isLoadingQuestion,
    isError: isErrorQuestion,
  } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => QuestionTreeService.getQuestionById(questionId),
  })

  const {
    data: answers,
    isLoading: isLoadingAnswers,
    isError: isErrorAnswers,
  } = useQuery({
    queryKey: ["answers", questionId],
    queryFn: () => QuestionTreeService.getAnswers(questionId),
  })

  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => PaypalService.getSubscription(session?.user?.id || ""),
    enabled: !!session?.user,
  })

  const handleClickStart = async () => {
    setShowStart(!showStart)
    setResultId([])
    setQuestionId(firstQuestionId)
    newQuestion(firstQuestionId)
    setShowResult(false)
  }

  const clickReturn = async () => {
    if (showResult || question?.id === firstQuestionId) {
      handleClickStart()
    } else {
      const newResultId = [...resultId]
      newResultId.pop()
      setResultId(newResultId)

      const previousQuestionId = returnToPreviousQuestion()
      setQuestionId(previousQuestionId)
    }
  }

  const handleClickedAnswer = async ({
    answerId,
    childQuestionId,
  }: {
    answerId: string
    childQuestionId: string
  }) => {
    if (!childQuestionId) {
      if (resultId[resultId.length - 1] !== answerId) {
        const updatedResultId = [...resultId, answerId]

        setResultId(updatedResultId)
        setShowResult(true)
      }
    } else {
      newQuestion(childQuestionId)
      setQuestionId(childQuestionId)

      if (resultId[length - 1] !== answerId) {
        setResultId([...resultId, answerId])
      }
    }
  }

  return (
    <Layout
      title="Question Tree"
      isLoading={status === "loading" || isLoadingSubscription}
      shouldHaveAccess={!!session && !!session?.user?.email && !!subscription}
    >
      {showStart && <Start onClickStart={handleClickStart} />}

      {!showStart && !showResult ? (
        <Middle
          loading={isLoadingQuestion && isLoadingAnswers}
          error={isErrorAnswers && isErrorQuestion}
          question={question}
          answers={answers}
          clickReturn={clickReturn}
          handleClickedAnswer={handleClickedAnswer}
        />
      ) : null}

      {showResult && (
        <ResultDiv
          session={session}
          resultId={resultId.join("")}
          startAgain={handleClickStart}
        />
      )}
    </Layout>
  )
}
