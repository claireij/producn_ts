import {
  Children,
  FormEventHandler,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react"

interface RadioGroupInterface {
  onChange?: FormEventHandler<HTMLElement>
  name?: string
  children: ReactNode
}

export const RadioGroup = ({
  onChange,
  name,
  children,
}: RadioGroupInterface) => {
  return (
    <div className="flex flex-col">
      {Children.map(children, (child) => {
        if (isValidElement(child))
          return cloneElement(child as ReactElement, {
            name,
            onChange,
          })
      })}
    </div>
  )
}
