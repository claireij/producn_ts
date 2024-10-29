import { SubscriptionsOverview } from "@components/subscriptions/SubscriptionsOverview"
import { Button } from "@components/_general/button/Button"

interface RegistrationStepTwoInterface {
  setRegistrationStep: (step: number) => void
  isVisible: boolean
  setCompletedRegistrationStep: (step: number) => void
}

export default function RegistrationStepTwo({
  setRegistrationStep,
  isVisible,
  setCompletedRegistrationStep,
}: RegistrationStepTwoInterface) {
  return (
    <div className={`flex flex-col items-center ${isVisible ? "" : "hidden"}`}>
      <h2 className="mb-4">Choose your subscription</h2>
      <SubscriptionsOverview />
      <Button
        classNames="mt-5"
        type="primary"
        onClick={() => {
          setRegistrationStep(3)
          setCompletedRegistrationStep(2)
        }}
      >
        Next: Choose your payment method
      </Button>
    </div>
  )
}
