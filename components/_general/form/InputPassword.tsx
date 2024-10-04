interface InputPasswordInterface {
  defaultValue?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
}

export const InputPassword = ({
  defaultValue,
  value,
  onChange,
}: InputPasswordInterface) => {
  return (
    <input
      className="border rounded-lg px-4 py-2 w-[400px]"
      value={value || defaultValue}
      onChange={onChange}
      type="password"
    ></input>
  )
}
