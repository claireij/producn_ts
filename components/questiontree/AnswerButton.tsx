import { AiOutlineInfoCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { useState } from "react"
import React from "react"
import { Button } from "@components/_general/button/Button"
import { Modal } from "@components/_general/Modal"

interface AnswerButtonInterface {
  child_question_id: string
  answer_id: string
  innerHTML: string
  handleClickedAnswer: ({
    answerId,
    childQuestionId,
  }: {
    answerId: string
    childQuestionId: string
  }) => void
}

export const AnswerButton = ({
  child_question_id,
  answer_id,
  innerHTML,
  handleClickedAnswer,
}: AnswerButtonInterface) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="mb-3">
      <Modal
        closable
        open={showInfo}
        onOk={() => setShowInfo(!showInfo)}
        closeIcon={
          <AiOutlineCloseCircle onClick={() => setShowInfo(!showInfo)} />
        }
      >
        Here is some info
      </Modal>

      <div className="flex gap-3 items-center">
        <Button
          onClick={() => {
            handleClickedAnswer({
              answerId: answer_id,
              childQuestionId: child_question_id,
            })
          }}
          type="primary"
        >
          {innerHTML}
        </Button>
        <AiOutlineInfoCircle onClick={() => setShowInfo(!showInfo)} />
      </div>
    </div>
  )
}
