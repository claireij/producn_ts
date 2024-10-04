import { useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { StatusEnum } from "@models/general"
import { getStatusIcon } from "@utils/general.utils.tsx"

export interface NotificationInterface {
  message: string
  title: string
  onClose?: (id: string) => void
  type?: StatusEnum
  id: string
}

export const Notification = ({
  message,
  title,
  onClose,
  type = StatusEnum.INFO,
  id,
}: NotificationInterface) => {
  const [showNotification, setShowNotification] = useState(true)

  if (!showNotification) return

  return (
    <div
      className="bg-white shadow p-5 rounded-lg flex gap-3 justify-between"
      key={id}
    >
      {getStatusIcon(type)}
      <div>
        <div className="flex mb-3">
          <h2 className="font-bold">{title}</h2>{" "}
        </div>
        {message}
      </div>
      <AiOutlineCloseCircle
        onClick={() => {
          setShowNotification(false)
          if (onClose) onClose(id)
        }}
      />
    </div>
  )
}
