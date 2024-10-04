import { createContext } from "react"
import { FormContextType } from "./form.types"

export const FormContext = createContext<FormContextType | null>(null)
