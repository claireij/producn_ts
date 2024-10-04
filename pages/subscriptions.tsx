import { Layout } from "@components/Layout"
import { SubscriptionsOverview } from "@components/subscriptions/SubscriptionsOverview"
import { useState } from "react"
import { PaypalPayment } from "@components/registration/PaypalPayment"
import { useSession } from "next-auth/react"
import { Form } from "@components/_general/form/Form"
import { useForm } from "@hooks/form.hooks"
import { Button } from "@components/_general/button/Button"
import { UserService } from "@services/user.service"
import { User } from "@models/user"
import { showNotification } from "@services/notification.service"
import { StatusEnum } from "@models/general"
import { PaypalService } from "@services/paypal.service"
import { useRouter } from "next/router"
import { ensureError } from "@utils/general.utils"

export default function Subscriptions() {
  const form = useForm()
  const router = useRouter()

  const [showPayment, setShowPayment] = useState(false)
  const { data: session, status } = useSession()

  const onSubmit = async (values: Partial<User>) => {
    try {
      const email = session?.user?.email
      const paypalSubscriptionId = values.paypalSubscriptionId

      if (!email) {
        showNotification(
          "Error",
          "Email is required to update your subscription.",
          StatusEnum.ERROR,
        )
        return
      }

      if (!paypalSubscriptionId) {
        showNotification(
          "Error",
          "PayPal Subscription ID is required to create a subscription.",
          StatusEnum.ERROR,
        )
        return
      }
      const newUser = await UserService.updateUser({
        email: email,
        ...values,
      })

      if (!values.subscription_id) throw new Error("Subscription ID is missing")

      await PaypalService.createSubscription({
        paypalSubscriptionId: paypalSubscriptionId,
        user: newUser,
        subscription_id: values.subscription_id
      })

      router.push("/profil")

      showNotification(
        "Successfully updated your subscription",
        "Your subscription was successfully updated.",
      )
    } catch (err) {
      const error = ensureError(err)
      showNotification("There was an error", error.message, StatusEnum.ERROR)
    }
  }

  return (
    <Layout
      title="Choose your subscription"
      shouldHaveAccess={status === "authenticated"}
    >
      <Form form={form}>
        {!showPayment ? (
          <>
            <SubscriptionsOverview />
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault()
                setShowPayment(true)
              }}
            >
              Proceed to payment
            </Button>
          </>
        ) : (
          <PaypalPayment
            form={form}
            onFinishRegistration={onSubmit}
            isVisible
          />
        )}
      </Form>
    </Layout>
  )
}
