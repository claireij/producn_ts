import { StatusEnum } from "@models/general.ts"
import { getStatusIcon, getStatusColor } from "@utils/general.utils.tsx"

interface AlertInterface {
  showIcon: boolean
  title: string
  message: string | React.ReactNode
  type: StatusEnum
}

export const Alert = ({ showIcon, title, message, type }: AlertInterface) => {
  const backgroundColor = getStatusColor(type, "bg")
  const borderColor = getStatusColor(type, "border")

  return (
    <div
      className={`${backgroundColor} bg-opacity-20 p-3 border mb-5 ${borderColor} rounded-lg`}
    >
      <div className="flex gap-2">
        {showIcon && getStatusIcon(type)}
        <h3>{title}</h3>
      </div>
      <p>{message}</p>
    </div>
  )
}
