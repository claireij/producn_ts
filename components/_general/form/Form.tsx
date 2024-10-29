import { useEffect } from "react"
import { FormItem } from "./FormItem"
import { FormContext } from "./Form.context"
import { FormContextType, FormValue, FormValues } from "./form.types"

interface FormInterface {
  form: FormContextType
  children: React.ReactNode
  onFinish?: (values: FormValues) => void
  initialValues?: Record<string, FormValue>
  centered?: boolean
}

export const Form = ({
  form,
  children,
  onFinish,
  initialValues,
  centered = true
}: FormInterface) => {
  useEffect(() => {
    if (initialValues) form.setFormValues(initialValues)
  }, [])

  return (
    <FormContext.Provider value={form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onFinish)()
        }}
        className={centered ? "flex flex-col items-center w-full" : ""}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.Item = FormItem
