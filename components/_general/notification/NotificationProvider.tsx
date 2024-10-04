import { ReactNode, useCallback, useState } from "react"
import { NotificationInterface } from "./Notification"
import { NotificationContext } from "@hooks/notification.hooks"
import { NotificationContainer } from "./NotificationContainer"
import { StatusEnum } from "@models/general"
import { setAddNotificationFn } from "@services/notification.service"

interface NotificationProviderInterface {
  children: ReactNode
}

export const NotificationProvider = ({
  children,
}: NotificationProviderInterface) => {
  const [notifications, setNotifications] = useState<
    Array<NotificationInterface>
  >([])

  const addNotification = useCallback(
    (title: string, message: string, type?: StatusEnum) => {
      const id = crypto.randomUUID()
      setNotifications((prev) => [...prev, { id, message, title, type }])
      setTimeout(() => removeNotification(id), 5000)
    },
    [],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    )
  }, [])

  setAddNotificationFn(addNotification)

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  )
}
