import React, { MouseEventHandler, ReactNode } from "react"
import Link from "next/link"

interface ButtonInterface {
  type?: "primary" | "link" | "default"
  href?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  icon?: ReactNode
  children?: React.ReactNode
  danger?: boolean
  target?: string
  rel?: string
  htmlType?: "button" | "submit"
  isDisabled?: boolean
  classNames?: string
}

export const Button = ({
  type = "default",
  href = "",
  onClick,
  icon,
  children,
  danger = false,
  target,
  rel,
  htmlType = "button",
  isDisabled = false,
  classNames = ""
}: ButtonInterface) => {
  const iconSized = <div className="w-5">{icon}</div>

  const buttonClassNames = `rounded-lg cursor-pointer h-fit w-fit button ${type} ${danger && "danger"} ${isDisabled && "pointer-events-none"} ${classNames}`

  if (href)
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={
          type !== "link"
            ? buttonClassNames
            : "underline text-blue inline-block visited:text-blue-900"
        }
      >
        {icon ? iconSized : <></>}
        {children}
      </Link>
    )

  if (htmlType === "submit") {
    return (
      <button className={buttonClassNames} type="submit">
        {children}
      </button>
    )
  }

  return (
    <div className={buttonClassNames} onClick={onClick}>
      {icon ? iconSized : <></>}
      {children}
    </div>
  )
}
