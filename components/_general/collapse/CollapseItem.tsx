import { ReactNode, useState } from "react"
import { MdNavigateNext } from "react-icons/md"

export type CollapseItemType = {
  key: string
  label: string
  children: ReactNode
}

interface CollapseItemInterface {
  item: CollapseItemType
}

export const CollapseItem = ({ item }: CollapseItemInterface) => {
  const [isOpen, setIsOpen] = useState(false)

  const { key, label, children } = item

  return (
    <div className="border border-grey" key={key}>
      <div
        className="flex  gap-2 items-center py-3 px-1 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdNavigateNext className={isOpen ? "rotate-90" : ""} />
        {label}
      </div>

      {isOpen && <div className="p-3 border-t border-grey">{children}</div>}
    </div>
  )
}
