import React, { ChangeEventHandler } from "react"

interface CheckboxInterface {
  id?: string
  label?: string
  checked?: boolean
  name?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({
  id,
  label,
  checked = false,
  name,
  onChange,
}: CheckboxInterface) => {
  return (
    <div>
      <label htmlFor={id} className="flex gap-2">
        <input
          className="pr-3 inline-block"
          checked={checked}
          type="checkbox"
          name={name}
          id={id}
          onChange={onChange}
        />
        <p>{label}</p>
      </label>
    </div>
  )
}
