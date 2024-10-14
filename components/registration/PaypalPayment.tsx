import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"
import { paypalSubscriptionPlans } from "../../consts"
import { showNotification } from "@services/notification.service"
import type { OnApproveData } from "@paypal/paypal-js/types/components/buttons"
import { ensureError } from "@utils/general.utils"
import { FormContextType } from "@components/_general/form/form.types"
import { User } from "@models/user"
import type { PayPalButtonCreateSubscription } from "@paypal/paypal-js/types/components/buttons"
import { StatusEnum } from "@models/general"

interface PaypalPaymentInterface {
  setRegistrationStep?: (step: number) => void
  setCompletedRegistrationStep?: (step: number) => void
  isVisible?: boolean
  form: FormContextType
  onFinishRegistration?: (values: Partial<User>) => Promise<void>
}

export const PaypalPayment = ({
  setCompletedRegistrationStep,
  isVisible,
  form,
  onFinishRegistration,
}: PaypalPaymentInterface) => {
  const [paymentComplete, setPaymentComplete] = useState(false)

  const successMessage = form
    ? "Thank you, your payment was successfull. You are going to receive a confirmation email in a couple of minutes. After confirming your email, you will be able to start using your subscription."
    : "Your payment was successful, you can start using your subscription now."

  const createSubscription: PayPalButtonCreateSubscription = async (
    _data,
    actions,
  ) => {
    const subscription = form.getFieldValue({ name: "subscription_id" })

    const paypalSubscriptionPlan = paypalSubscriptionPlans.find(
      (element) => element.subscription_id == subscription,
    )?.plan_id

    if (!paypalSubscriptionPlan) {
      showNotification(
        "Issue creating subscription",
        `Sorry, we had an issue while creating your subscription ${paypalSubscriptionPlan}`,
        StatusEnum.ERROR,
      )
      throw new Error("Issue creating subscription")
    }

    try {
      const subscriptionId = await actions.subscription.create({
        plan_id:
          process.env.NODE_ENV === "development"
            ? "P-6Y377168TB470992GMQ4V4SI"
            : paypalSubscriptionPlan,
      })

      return subscriptionId
    } catch (error) {
      showNotification(
        "Issue creating subscription",
        "Sorry, we had an issue while creating your subscription",
        StatusEnum.ERROR,
      )
      console.log(error)
      throw new Error("Failed to create subscription")
    }
  }

  const onApprove = async (data: OnApproveData) => {
    try {
      form.handleSubmit(() => {
        if (onFinishRegistration && data.subscriptionID) {
          onFinishRegistration({
            ...form.formValues,
            paypalSubscriptionId: data.subscriptionID,
          })
        }
      })()
      setPaymentComplete(true)
      if (setCompletedRegistrationStep) setCompletedRegistrationStep(3)
    } catch (err) {
      const error = ensureError(err)
      console.log(error)
    }
  }

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
    showNotification("Paypal error", "Unable to connect to paypal")

  return (
    <div className={isVisible ? "" : "hidden"}>
      <main>
        {!paymentComplete ? (
        <>
          <h2 className="registration__h2">Choose your payment method</h2>
          <PayPalScriptProvider
            key={isVisible ? "visible" : "hidden"}
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
              vault: true,
              intent: "subscription",
            }}
          >
            <PayPalButtons
              style={{
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 50,
              }}
              createSubscription={createSubscription}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
        </>
         ) : (
          <p>{successMessage}</p>
        )}
      </main>
    </div>
  )
}
