import { MouseEventHandler, ReactElement } from "react"
import { Button } from "@components/_general/button/Button"
import { IoMdClose } from "react-icons/io"

interface ModalInterface {
  open: boolean
  okText?: string
  onOk?: MouseEventHandler<HTMLDivElement>
  cancelText?: string
  onCancel: MouseEventHandler
  children: React.ReactNode
  closable?: boolean
  title?: ReactElement
  isSubmit?: boolean
}

export const Modal = ({
  children,
  okText = "OK",
  onOk,
  onCancel,
  cancelText = "Cancel",
  closable = false,
  title,
  open,
  isSubmit,
}: ModalInterface) => {
  if (!open) return

  return (
    <div
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-45"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow p-10 flex flex-col">
          <div className="flex justify-between mb-5">
            {title && <div>{title}</div>}
            {closable && (
              <div className="p-4" onClick={onCancel}>
                <button
                  onClick={onCancel}
                  className="absolute top-5 right-5 bg-grey-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            )}
          </div>

          {children}

          <div className="flex justify-end gap-3 mt-5">
            {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
            {onOk && (
              <Button
                htmlType={isSubmit ? "submit" : "button"}
                type="primary"
                onClick={onOk}
              >
                {okText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
