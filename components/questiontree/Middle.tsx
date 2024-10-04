import { Answer, Question } from "@models/questiontree"
import { Loader } from "@components/Loader"
import { Button } from "@components/_general/button/Button"
import { AnswerButton } from "@components/questiontree/AnswerButton"
import { AnswerList } from "@components/questiontree/AnswerList"
import React from "react"

interface MiddleInterface {
  loading: boolean
  error: boolean
  question?: Question
  answers?: Array<Answer>
  clickReturn: () => Promise<void>
  handleClickedAnswer: ({
    answerId,
    childQuestionId,
  }: {
    answerId: string
    childQuestionId: string
  }) => Promise<void>
}

export const Middle = ({
  loading,
  error,
  question,
  answers,
  clickReturn,
  handleClickedAnswer,
}: MiddleInterface) => {
  if (loading) {
    return <Loader />
  }

  if (!question || !answers || error) {
    return <>There seems to be an issue.</>
  }

  return (
    <div>
      <h2 className="mb-5">{question?.text}</h2>

      <div>
        {answers.length <= 8 ? (
          answers.map((answer) => {
            return (
              <AnswerButton
                handleClickedAnswer={handleClickedAnswer}
                child_question_id={answer.child_question_id}
                answer_id={answer.id}
                innerHTML={answer.text}
                key={answer.id}
              />
            )
          })
        ) : (
          <AnswerList
            answers={answers}
            handleClickedAnswer={handleClickedAnswer}
          />
        )}
        <div className="flex justify-end mt-10">
          <Button onClick={clickReturn}>Return</Button>
        </div>
      </div>
    </div>
  )
}
