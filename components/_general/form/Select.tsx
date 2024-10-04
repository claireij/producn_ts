interface SelectInterface {
  name?: string
  value?: string | number
  label?: string
  options: Array<Option>
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

type Option = {
  value: string | number
  label: string
}

export const Select = ({
  name,
  value,
  options,
  label,
  onChange,
}: SelectInterface) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        className="border rounded-lg px-4 py-2 w-[400px]"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
