import { useRef, useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { GrClose } from "react-icons/gr"

interface SearchInterface {
  placeholder?: string
  onSearch: (value: string) => void
}

export const Search = ({
  placeholder = "Search",
  onSearch,
}: SearchInterface) => {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className="mb-5 border rounded-lg px-4 py-2 w-[400px] flex justify-between items-center cursor-text focus-within:border-blue focus-within:border-[2px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex gap-3 items-center">
        <HiOutlineSearch />
        <input
          ref={inputRef}
          id="search-input"
          className="border-none outline-none"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onSearch(e.target.value)
          }}
        />
      </div>
      {value && (
        <GrClose
          className="cursor-pointer"
          onClick={() => {
            setValue("")
            onSearch("")
          }}
        />
      )}
    </div>
  )
}
