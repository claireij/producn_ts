import React, { useState } from "react"
import { Search } from "@components/_general/Search"
import { Answer } from "@models/questiontree"

interface AnswerListInterface {
  answers: Array<Answer>
  handleClickedAnswer: ({
    answerId,
    childQuestionId,
  }: {
    answerId: string
    childQuestionId: string
  }) => Promise<void>
}

export const AnswerList = ({
  answers,
  handleClickedAnswer,
}: AnswerListInterface) => {
  const [filteredAnswers, setFilteredAnswers] = useState(answers)

  const handleSearchChange = (searchTerm: string) => {
    const searchTermLower = searchTerm.toLowerCase()
    const newFilteredAnswers = answers.filter((answer) =>
      answer.text.toLowerCase().includes(searchTermLower),
    )
    setFilteredAnswers(newFilteredAnswers)
  }

  return (
    <div>
      <Search onSearch={handleSearchChange} />

      <ul>
        {filteredAnswers.map((answer) => {
          return (
            <li
              key={answer.id}
              onClick={() =>
                handleClickedAnswer({
                  answerId: answer.id,
                  childQuestionId: answer.child_question_id,
                })
              }
            >
              {answer.text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
