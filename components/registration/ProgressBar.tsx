import { StatusEnum } from "@models/general"
import { showNotification } from "@services/notification.service"
import { FaCheckCircle } from "react-icons/fa"
import { FaDotCircle } from "react-icons/fa"
import { GoDotFill } from "react-icons/go"

interface ProgressBarInterface {
  registrationStep: number
  setRegistrationStep: (step: number) => void
  completedRegistrationStep: number
}

export const ProgressBar = ({
  setRegistrationStep,
  registrationStep,
  completedRegistrationStep,
}: ProgressBarInterface) => {
  const steps = [
    { title: "Personal Information" },
    { title: "Subscription" },
    { title: "Payment & Confirmation" },
  ]

  const iconDone = <FaCheckCircle />
  const iconCurrent = <FaDotCircle />
  const iconNotDone = <GoDotFill />

  const classNames = "flex flex-col items-center mb-5"
  const activeClassName = " text-blue"
  return (
    <div className="mt-10 mb-3">
      <div className="border -mb-2"></div>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = registrationStep == index + 1
          const isDone = registrationStep > index + 1
          const isNotDone = registrationStep < index + 1

          return (
            <div
              key={step.title}
              onClick={() => {
                const currentStep = index + 1
                const nextStepToBeCompleted = completedRegistrationStep + 1
                if (currentStep <= nextStepToBeCompleted) {
                  setRegistrationStep(currentStep)
                } else {
                  showNotification(
                    "You can't skip registration steps",
                    "Please fill out the missing information, before moving on to the next step",
                    StatusEnum.ERROR,
                  )
                }
              }}
              className={isActive ? classNames + activeClassName : classNames}
            >
              <div className="mb-2 bg-white">
                {isActive && iconCurrent}
                {isDone && iconDone}
                {isNotDone && iconNotDone}
              </div>

              {step.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}
