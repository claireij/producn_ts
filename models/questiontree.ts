export type Question = {
  id: string
  text: string
}

export type Answer = {
  id: string
  text: string
  child_question_id: string
}

export type Result = {
  id: string
  text: string
}

export type ResultFeedback = {
  helpful: boolean
  resultId: string
  userId: string
  feedback: string
}
