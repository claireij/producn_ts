import { createContext, useContext } from "react"

interface NotificationContextType {
  addNotification: (message: string, description: string) => void
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    )
  }
  return context
}
