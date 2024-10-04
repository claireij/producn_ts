import { Notification, NotificationInterface } from "./Notification"

interface NotificationContainerInterface {
  notifications: Array<NotificationInterface>
  onRemove: (id: string) => void
}

export const NotificationContainer: React.FC<
  NotificationContainerInterface
> = ({ notifications, onRemove }) => {
  return (
    <div className="flex flex-col gap-3 fixed top-5 right-5 w-[400px] z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          title={notification.title}
          onClose={onRemove}
        />
      ))}
    </div>
  )
}
