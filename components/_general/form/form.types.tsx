import { FormEvent } from "react"

export type FormItemType =
  | "string"
  | "number"
  | "boolean"
  | "email"
  | "password"
  | "new_password"
  | "password_confirmation"
  | "radio"
  | "checkbox"

export type Rule = {
  required?: boolean
  message?: string
  whitespace?: boolean
  type?: FormItemType
  min?: number
  max?: number
  pattern?: RegExp
  validator?: <T>(rule: Rule, value: FormValue) => Promise<T>
}

export interface RegisterFieldInterface {
  name: string
  defaultValue?: FormValue
  rules?: Array<Rule>
  label?: string
}

export type FormValue = string | number | Array<string> | boolean

export interface SetFieldValueInterface {
  name: string
  value: FormValue
  type: FormItemType
  checked: boolean
}

export interface GetFieldValueInterface {
  name: string
}

export interface ValidateFieldInterface {
  name: string
  label?: string
  rules?: Array<Rule>
  value?: FormValue
}

export type FormValues = Record<string, FormValue | undefined>

export interface FormContextType {
  formValues: FormValues
  errors: Record<string, string>
  registerField: (field: RegisterFieldInterface) => void
  setFieldValue: (field: SetFieldValueInterface) => void
  getFieldValue: (field: GetFieldValueInterface) => FormValue | undefined
  validateField: (field: ValidateFieldInterface) => boolean
  handleSubmit: (
    onFinish?: (values: FormValues) => void,
  ) => (e?: FormEvent<HTMLFormElement>) => void
  setFormValues: (values: FormValues) => void
  validateForm: () => boolean
  isFieldTouched: (fieldName: string) => boolean
}
