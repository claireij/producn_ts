import { CollapseItem, CollapseItemType } from "./CollapseItem"

interface CollapseInterface {
  items: Array<CollapseItemType>
  title: string
  emptyMessage: string
}

export const Collapse = ({
  items,
  title,
  emptyMessage = "No data.",
}: CollapseInterface) => {
  return (
    <div className="mb-5">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        items.map((item) => {
          return <CollapseItem item={item} key={item.key} />
        })
      )}
    </div>
  )
}
