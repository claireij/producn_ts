import { useState } from "react"

interface SegmentedInterface {
  onChange?: (value: string) => void
  options: Array<SegementedItemType>
  defaultValue: string
  name: string
}

type SegementedItemType = {
  label: string
  value: string
}

export const Segmented = ({
  onChange,
  options,
  defaultValue,
  name,
}: SegmentedInterface) => {
  const [checked, setChecked] = useState(defaultValue)
  return (
    <fieldset className="bg-grey flex w-full rounded mb-5">
      {options.map((option) => {
        const isChecked = checked === option.value
        const checkedStyling = "bg-white shadow-lg rounded"
        return (
          <label
            className={`w-1/2 px-4 py-2 m-1 ${isChecked && checkedStyling}`}
            key={option.label}
          >
            <input
              className="w-0 h-0"
              name={name}
              type="radio"
              value={option.value}
              defaultChecked={defaultValue === option.value}
              onChange={(e) => {
                if (onChange) onChange(e.target.value)
                setChecked(e.target.value)
              }}
            />
            {option.label}
          </label>
        )
      })}
    </fieldset>
  )
}
