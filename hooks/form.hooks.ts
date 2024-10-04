import { FormEvent, useState } from "react"
import {
  hasWhitespaces,
  isValidEmail,
  isValidPassword,
} from "@utils/general.utils.tsx"
import {
  FormContextType,
  FormValue,
  FormValues,
  GetFieldValueInterface,
  RegisterFieldInterface,
  Rule,
  SetFieldValueInterface,
  ValidateFieldInterface,
} from "@components/_general/form/form.types"

export const useForm = (): FormContextType => {
  const [formValues, setFormValues] = useState<
    Record<string, FormValue | undefined>
  >({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formFields, setFormFields] = useState<
    Record<string, { rules: Array<Rule>; label?: string }>
  >({})
  const [touchedFields, setTouchedFields] = useState<Array<string>>([])

  const registerField = ({
    name,
    rules = [],
    label,
    defaultValue,
  }: RegisterFieldInterface) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: defaultValue,
      }
    })

    if (defaultValue) {
      setTouchedFields((prev) => {
        return [...prev, name]
      })
    }

    setFormFields((prev) => ({
      ...prev,
      [name]: {
        rules,
        label,
      },
    }))
  }

  const setFieldValue = ({
    name,
    value,
    type,
    checked,
  }: SetFieldValueInterface) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    const newTouchedFields = touchedFields?.includes(name)
      ? touchedFields
      : [...touchedFields, name]
    setTouchedFields(newTouchedFields)

    if (type === "radio") {
      let radioButtonValue = value

      if (value === "on") radioButtonValue = true
      if (value === "off") radioButtonValue = false

      setFormValues((prevData) => ({
        ...prevData,
        [name]: radioButtonValue,
      }))
    } else if (type === "checkbox") {
      setFormValues((prevData) => ({
        ...prevData,
        [name]: checked,
      }))
    } else {
      setFormValues((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const isFieldTouched = (fieldName: string) =>
    touchedFields.includes(fieldName)

  const getFieldValue = ({ name }: GetFieldValueInterface) => formValues?.[name]

  const validateField = ({
    name,
    label,
    rules,
    value,
  }: ValidateFieldInterface) => {
    let error = ""
    const fieldName = label || name
    rules?.map((rule) => {
      if (rule.required && value === "") {
        error = rule.message || `${fieldName} is required.`
      }

      if (
        rule.whitespace &&
        typeof value === "string" &&
        hasWhitespaces(value)
      ) {
        error =
          rule.message ||
          `${fieldName} isn't allowed to contain any whitespaces`
      }

      if (
        rule.type === "email" &&
        typeof value === "string" &&
        !isValidEmail(value)
      ) {
        error = rule.message || "You need to enter a valid email."
      }

      if (rule.type === "string" && typeof value !== "string") {
        error = rule.message || `${fieldName} should be a string.`
      }

      if (rule.type === "number" && typeof value !== "number") {
        error = rule.message || `${fieldName} should be a number.`
      }

      if (rule.type === "boolean" && typeof value !== "boolean") {
        error = rule.message || `${fieldName} should be a boolean.`
      }

      if (rule.type === "password_confirmation") {
        const newPassword =
          name === "password" ? value : formValues?.["password"]
        const confirmNewPassword =
          name === "confirm_password" ? value : formValues?.["confirm_password"]

        if (newPassword !== confirmNewPassword) {
          error =
            rule.message ||
            "Your new and the confirm password are not identical"
        } else {
          setErrors((prev) => ({
            ...prev,
            password: "",
            confirm_password: "",
          }))
        }
      }

      if (rule.type === "password" && typeof value === "string") {
        const passwordErrors = isValidPassword(value)

        if (passwordErrors.length !== 0) error = passwordErrors.join(", ")
      }

      if (rule.min && typeof value === "number" && value < rule.min) {
        error =
          rule.message ||
          `${fieldName} should not be small than ${rule.max} characters.`
      }

      if (rule.max && typeof value === "number" && value > rule.max) {
        error =
          rule.message ||
          `${fieldName} should not be higher than ${rule.max} characters.`
      }

      if (rule.pattern && typeof value === "string") {
        const regex = new RegExp(rule.pattern)
        const passesRegex = regex.test(value)
        if (!passesRegex) {
          error = rule.message || `${fieldName} is not valid.`
        }
      }
    })

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
    return !error
  }

  const validateForm = () => {
    let hasError = false
    const newErrors: Record<string, string> = {}

    Object.keys(formValues).forEach((fieldName: string) => {
      const fieldValue = formValues[fieldName]
      const fieldRules = formFields[fieldName]?.rules || []
      const fieldLabel = formFields[fieldName]?.label || fieldName

      const isFieldValid = validateField({
        name: fieldName,
        rules: fieldRules,
        value: fieldValue,
        label: fieldLabel,
      })

      if (!isFieldValid) {
        hasError = true
      }

      if (errors[fieldName]) {
        newErrors[fieldName] = errors[fieldName]
      }
    })

    setErrors(newErrors)

    return !hasError
  }

  const handleSubmit =
    (onFinish?: (values: FormValues) => void) =>
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      if (validateForm()) {
        const touchedFormValues = Object.fromEntries(
          Object.entries(formValues).filter(([key]) =>
            touchedFields?.includes(key),
          ),
        )
        if (onFinish) onFinish(touchedFormValues)
      }
    }

  return {
    formValues,
    errors,
    registerField,
    setFieldValue,
    getFieldValue,
    validateField,
    handleSubmit,
    setFormValues,
    validateForm,
    isFieldTouched,
  }
}
