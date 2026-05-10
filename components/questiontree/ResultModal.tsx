import { Button } from "@components/_general/button/Button"
import { Modal } from "@components/_general/Modal"
import { Tag } from "@components/_general/Tag"
import { StatusEnum } from "@models/general"
import { showNotification } from "@services/notification.service"
import { QuestionTreeService } from "@services/questiontree.service"
import { sanitizeInput } from "@utils/security.utils"
import { useState } from "react"

interface ResultModalInterface {
  resultId: string
  userId: string
}

export const ResultModal = ({ resultId, userId }: ResultModalInterface) => {
  const [explanation, setExplanation] = useState("")
  const [showResultModal, setShowResultModal] = useState(false)
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false)
  const [selectedIssues, setSelectedIssues] = useState<Array<string>>([])

  const handleResultHelpfulness = (helpful: boolean) => {
    try {
      const sanitizedExplanation = sanitizeInput(explanation)
      QuestionTreeService.createFeedback({
        resultId,
        userId,
        rating: helpful,
        explanation: [...selectedIssues, sanitizedExplanation].join("; ")
      })

      setHasGivenFeedback(true)

      showNotification(
        "Thank you!",
        "We received your feedback and are constantly working on creating better results for you.",
        StatusEnum.SUCCESS,
      )
    } catch (error) {
      // TODO: this isn't working yet
      showNotification(
        "Error",
        "There was an error submitting your feedback. Please try again later.",
        StatusEnum.ERROR,
      )
    }
  }

  const issues = ["Wrong diagnosis", "Hard to understand", "Didn't fix the issue", "Too long"]

  const handleIssueClick = (issue: string) => {
    setSelectedIssues((prev) => {
      if (prev.includes(issue)) {
        return prev.filter((selectedIssue) => selectedIssue !== issue)
      } else {
        return [...prev, issue]
      }
    })
  }

  if(hasGivenFeedback) return

  return (
    <>
      <div>
        <p className="mb-2">How helpful was this answer?</p>
        <div className="flex gap-3">
          <Button onClick={() => setShowResultModal(true)}>Not Helpful</Button>
          <Button onClick={() => handleResultHelpfulness(true)} type="primary">
            Very Helpful
          </Button>
        </div>
      </div>
      <Modal
        closable
        open={showResultModal}
        onOk={() => {
          handleResultHelpfulness(false)
          setShowResultModal(false)
        }}
        onCancel={() => {
          setShowResultModal(false)
        }}
        okText="Submit Answer"
        title={
          <div>
            <h2 className="uppercase text-xs text-blue">Feedback</h2>
            <h1 className="font-bold">What went wrong?</h1>
          </div>
        }
      >
        <p className="mb-7">
          Your feedback helps us improve the question tree for everyone.
        </p>
        <div className="flex gap-2 mb-10 w-[500px] flex-wrap">
                {issues?.map((issue) => (
                  <Tag
                    key={issue}
                    active={selectedIssues.includes(issue)}
                    name={issue}
                    handleClick={() => handleIssueClick(issue)}
                  />
                ))}
              </div>
        
        <div className="w-full">
          <textarea
            maxLength={1000}
            className="bg-grey-100 w-full p-4"
            value={explanation}
            id="feedback"
            name="feedback"
            rows={5}
            cols={30}
            placeholder="Tell us more (optional)"
            onChange={(e) => {
              setExplanation(e.target.value)
            }}
          ></textarea>
        </div>
      </Modal>
    </>
  )
}
