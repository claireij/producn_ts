import { MouseEventHandler } from "react"

interface TagInterface {
  name: string
  handleClick: MouseEventHandler<HTMLLabelElement>
  active: boolean
}

export const Tag = ({ name, handleClick, active }: TagInterface) => {
  const color = active ? "bg-blue" : "bg-grey-200"
  return (
    <div className="flex" key={name}>
      <input type="checkbox" className="hidden" name={name} id={name} />
      <label
        htmlFor={name}
        className={`px-4 py-2 ${color} rounded-full text-white`}
        onClick={handleClick}
      >
        {name}
      </label>
    </div>
  )
}
