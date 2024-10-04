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
      className={`w-[378px] fixed top-0 ${placement}-0 bottom-0 bg-white z-50 shadow-[rgba(0,0,0,0.1)_5px_5px_4px_0px]`}
    >
      <div className="py-5 border-b border-grey">
        <div className="pl-5">
          <GrClose onClick={onClose} className="cursor-pointer" />
        </div>
      </div>
      <div className="p-5 ">{children}</div>
    </div>
  )
}
