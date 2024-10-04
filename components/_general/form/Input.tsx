import { InputPassword } from "./InputPassword"

interface InputInterface {
  defaultValue?: string
  status?: "error" | "warning"
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  type?: string
}

export const Input = ({
  defaultValue,
  value,
  onChange,
  type = "text",
}: InputInterface) => {
  return (
    <input
      type={type}
      className="border rounded-lg px-4 py-2 w-[400px]"
      value={value || defaultValue}
      onChange={onChange}
    ></input>
  )
}

Input.Password = InputPassword
