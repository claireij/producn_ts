import { Question } from "../../models/questiontree"
import questiontreeStack from "./questiontreeStack"

const previousQuestion = new questiontreeStack()

let currentQuestion: string

export function showCurrentQuestion(action: string) {
  console.log(`\n${action}`)
  console.log(`Current question = ${currentQuestion}`)
  console.log("Previous question = " + previousQuestion.peek())
}

export function newQuestion(questionId: Question["id"]) {
  previousQuestion.push(currentQuestion)
  currentQuestion = questionId
  showCurrentQuestion("NEW: ")
}

export function returnToPreviousQuestion() {
  currentQuestion = previousQuestion.pop()
  showCurrentQuestion("BACK: ")
  return currentQuestion
}

//When going to the next page
export function nextQuestion() {
  previousQuestion.push(currentQuestion)
  showCurrentQuestion("NEXT: ")
}
