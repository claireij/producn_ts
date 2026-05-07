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
  const iconSized = icon ? <div className="w-5 shrink-0">{icon}</div> : null

  const baseClasses =
    "inline-flex items-center justify-center gap-2 border border-2 px-5 py-2 text-base font-medium text-black shadow-sm shadow-black/5 transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black/20 disabled:pointer-events-none disabled:opacity-50"

  const hoverClasses =
    type === "link"
      ? "underline text-blue-600 visited:text-blue-900"
      : "hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50"

  const dangerClasses = danger
    ? "border-red-400 text-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-50"
    : ""

  const primaryClasses = type === "primary" ? "bg-blue border-blue text-white hover:bg-blue-600 hover:border-blue-600" : "border-black bg-white"

  const buttonClassNames = `${baseClasses} ${hoverClasses} ${dangerClasses} ${primaryClasses} ${classNames}`

  if (href)
    return (
      <Link href={href} target={target} rel={rel} className={buttonClassNames}>
        {iconSized}
        {children}
      </Link>
    )

  return (
    <button
      className={buttonClassNames}
      type={htmlType}
      onClick={onClick as React.MouseEventHandler}
      disabled={isDisabled}
    >
      {iconSized}
      {children}
    </button>
  )
}
