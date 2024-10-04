import { Modal } from "@components/_general/Modal"
import { StatusEnum } from "@models/general"
import { ResultFeedback } from "@models/questiontree"
import { Button } from "@react-email/components"
import { showNotification } from "@services/notification.service"
import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

interface ResultModalInterface {
  resultId: string
  userId: string
}

export const ResultModal = ({ resultId, userId }: ResultModalInterface) => {
  const [resultHelpfulness, setResultHelpfulness] = useState<ResultFeedback>()
  const [feedback, setFeedback] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)

  const handleResultHelpfulness = (helpful: boolean) => {
    setResultHelpfulness({
      helpful,
      resultId: resultId,
      userId: userId,
      feedback: feedback,
    })

    showNotification(
      "Thank you!",
      "We received your feedback and are constantly working on creating better results for you.",
      StatusEnum.SUCCESS,
    )

    //TODO: save in an analytics table
  }

  return (
    <>
      {resultHelpfulness && (
        <div className="mb-5">
          <p className="mb-2">Did this result help you?</p>
          <div className="flex gap-3">
            <Button onClick={() => setShowResultModal(true)}>No</Button>
            <Button
              onClick={() => handleResultHelpfulness(true)}
              type="primary"
            >
              Yes
            </Button>
          </div>
        </div>
      )}
      <Modal
        closable
        open={showResultModal}
        onOk={() => {
          handleResultHelpfulness(false)
          setShowResultModal(false)
        }}
        okText="Submit Answer"
        closeIcon={
          <AiOutlineCloseCircle
            onClick={() => {
              setShowResultModal(false)
            }}
          />
        }
      >
        <h2>How come this result wasn't helpful?</h2>
        <div className="div--textarea">
          <textarea
            value={feedback}
            id="feedback"
            name="feedback"
            rows={5}
            cols={30}
            placeholder="Feedback"
            onChange={(e) => {
              setFeedback(e.target.value)
            }}
          ></textarea>
        </div>
      </Modal>
    </>
  )
}
