import { TiEdit } from "react-icons/ti"
import { Modal } from "@components/_general/Modal"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { MouseEventHandler, ReactNode } from "react"

interface EditFieldInterface {
  title: string
  value: string | ReactNode
  isOpen: boolean
  onClick: MouseEventHandler<SVGElement | HTMLDivElement>
  children: React.ReactNode
}

export const EditField = ({
  title,
  value,
  isOpen,
  onClick,
  children,
}: EditFieldInterface) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h4 className="w-[100px] font-bold">{title}</h4>
        <div>{value}</div>
        <TiEdit onClick={onClick} className="text-blue" />
      </div>

      <Modal
        isSubmit={true}
        closeIcon={<AiOutlineCloseCircle onClick={onClick} />}
        title={title}
        open={isOpen}
        okText="Save"
        closable
        onCancel={onClick}
        onOk={() => {}}
      >
        <div className="flex flex-col gap-3">{children}</div>
      </Modal>
    </div>
  )
}
