import { OnClickIconType } from "@models/general"
import { GrClose } from "react-icons/gr"

interface DrawerInterface {
  placement?: "left" | "right"
  onClose?: OnClickIconType
  open: boolean
  children?: React.ReactNode
}

export const Drawer = ({
  placement = "left",
  onClose,
  open,
  children,
}: DrawerInterface) => {
  if (!open) return

  return (
    <div
      className={`w-[378px] fixed top-0 ${placement}-0 bottom-0 bg-white z-50`}
    >
      <div className="py-5 border-b border-gray-200">
        <div className="pl-5">
          <GrClose onClick={onClose} />
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
