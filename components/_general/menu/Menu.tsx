import React, { ReactNode } from "react"

type Item = {
  key: string
  label: ReactNode
}

interface MenuInterface {
  mode?: "vertical" | "horizontal"
  items: Array<Item>
}

export const Menu = ({ mode = "horizontal", items }: MenuInterface) => {
  return (
    <ul className={`menu--${mode} menu`}>
      {items.map((item) => {
        return <li key={item.key}>{item.label}</li>
      })}
    </ul>
  )
}
