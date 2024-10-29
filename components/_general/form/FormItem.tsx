import React, { cloneElement, useContext, useEffect } from "react"
import { FormContext } from "./Form.context"
import { FormContextType, FormItemType, Rule } from "./form.types"

interface FormItemInterface {
  name: string
  label?: string
  children: React.ReactElement
  rules?: Array<Rule>
}

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("Form.Item must be used within a Form.")
  }
  return context
}

export const FormItem = ({
  name,
  label,
  rules,
  children,
}: FormItemInterface) => {
  const form = useFormContext()

  useEffect(() => {
    form?.registerField({ name, rules, label, defaultValue: value })
  }, [])

  const value = form.getFieldValue({ name })

  const isRequired = rules?.some(rule => rule.required === true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue({
      name,
      value: e.target.value,
      type: e.target.type as FormItemType,
      checked: e.target.checked,
    })
    form.validateField({ name, label, rules, value: e.target.value })
  }

  const error = form.errors[name]

  const itemProps = {
    onChange: handleChange,
    value: value,
    name,
    checked: value,
  }

  const item = cloneElement(children, itemProps)

  return (
    <div className="form-item flex flex-col gap-1  mb-3">
      <label>{label} {isRequired && "*"}</label>
      {item}
      {error && <div className="form-error text-red">{error}</div>}
    </div>
  )
}
