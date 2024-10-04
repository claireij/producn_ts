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
    <div className={isVisible ? "" : "hidden"}>
      <h2 className="registration__h2">Choose your subscription</h2>
      <SubscriptionsOverview />
      <Button
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
