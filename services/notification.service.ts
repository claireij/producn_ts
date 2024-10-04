import { StatusEnum } from "@models/general"

let addNotificationFn: (
  message: string,
  description: string,
  type?: StatusEnum,
) => void

export const setAddNotificationFn = (
  fn: (message: string, description: string) => void,
) => {
  addNotificationFn = fn
}

export const showNotification = (
  message: string,
  description: string,
  type?: StatusEnum,
) => {
  if (addNotificationFn) {
    addNotificationFn(message, description, type)
  } else {
    console.warn("Notification function is not set yet")
  }
}
