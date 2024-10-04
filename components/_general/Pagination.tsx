import { useState } from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

interface PaginationInterface {
  total: number
  defaultCurrent?: number
  onChange: (page: number) => void
  pageSize?: number
  current?: number
}

export const Pagination = ({
  total,
  defaultCurrent = 1,
  onChange,
  pageSize = 6,
  current,
}: PaginationInterface) => {
  const totalPages = Math.ceil(total / pageSize)
  const [currentPage, setCurrentPage] = useState(current || defaultCurrent)
  const activeClassNames = "text-blue border border-blue"
  const elementClassNames = "flex justify-center items-center w-10 h-10"
  const disabledClassNames = "hidden"

  if (total === 0) return

  return (
    <ul className="flex gap-2 justify-center my-5">
      <li
        onClick={() => {
          setCurrentPage(currentPage - 1)
          onChange(currentPage - 1)
        }}
        className={`${elementClassNames} ${currentPage === 1 ? disabledClassNames : ""}`}
      >
        <MdNavigateBefore />
      </li>

      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          className={`${elementClassNames} ${currentPage === index + 1 ? activeClassNames : ""}`}
          onClick={() => {
            setCurrentPage(index + 1)
            onChange(index + 1)
          }}
        >
          <a>{index + 1}</a>
        </li>
      ))}

      <li
        onClick={() => {
          setCurrentPage(currentPage + 1)
          onChange(currentPage + 1)
        }}
        className={`${elementClassNames} ${currentPage === totalPages ? disabledClassNames : ""}`}
      >
        <MdNavigateNext />
      </li>
    </ul>
  )
}
