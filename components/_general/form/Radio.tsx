import { RadioGroup } from "./RadioGroup"

interface RadioInterface {
  value?: string
  children: React.ReactNode
  isDefault?: boolean
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = ({
  value,
  children,
  isDefault = false,
  name,
  onChange,
}: RadioInterface) => {
  return (
    <label>
      <input
        onChange={onChange}
        defaultChecked={isDefault}
        type="radio"
        value={value}
        className="mr-2"
        name={name}
      />
      {children}
    </label>
  )
}

Radio.Group = RadioGroup
