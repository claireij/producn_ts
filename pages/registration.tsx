import { Layout } from "@components/Layout"
import { useState } from "react"
import { RegistrationStepOne } from "@components/registration/RegistrationStepOne"
import RegistrationStepTwo from "@components/registration/RegistrationStepTwo"
import { PaypalPayment } from "@components/registration/PaypalPayment"
import { useParams } from "react-router-dom"
import { GenderEnum, User } from "@models/user"
import { Form } from "@components/_general/form/Form.tsx"
import { useForm } from "@hooks/form.hooks"
import { ProgressBar } from "@components/registration/ProgressBar"
import { UserService } from "@services/user.service"
import { ensureError, randomString } from "@utils/general.utils.tsx"
import { EmailService } from "@services/email.service"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { PaypalService } from "@services/paypal.service"
import { StatusEnum } from "@models/general"
import { showNotification } from "@services/notification.service"
import { SubscriptionEnum } from "@models/subscription"

function Registration() {
  const router = useRouter()

  const registrationForm = useForm()

  const [registrationStep, setRegistrationStep] = useState(1)
  const [completedRegistrationStep, setCompletedRegistrationStep] = useState(0)

  const initialUserValues = {
    gender: GenderEnum.FEMALE,
    subscription_id: SubscriptionEnum.PRO_YEARLY,
  }

  const { status } = useSession()

  const onFinishRegistration = async (values: Partial<User>) => {
    const emailConfirmationString = randomString()

    try {
      const newUser = await UserService.createUser(
        values,
        emailConfirmationString,
      )
      showNotification(
        "Registration successfully initialized",
        "You should receive an email to confirm your registration soon.",
      )

      if (!values.email || !values.firstname)
        throw new Error("Email and/or firstname missing.")

      EmailService.sendEmailVerificationEmail({
        userData: { email: values.email, firstname: values.firstname },
        emailConfirmationString,
      })

      try {
        if (!values.paypalSubscriptionId)
          throw new Error("Paypal subscription id missing.")

        if(!values.subscription_id)
          throw new Error("Subscription ID missing")
        
        await PaypalService.createSubscription({
          paypalSubscriptionId: values.paypalSubscriptionId,
          user: newUser,
          subscription_id: values.subscription_id
        })
      } catch (err) {
        const error = ensureError(err)
        showNotification(
          "Subscription creation failed",
          error.message,
          StatusEnum.ERROR,
        )
      }

      router.push("/signin")
    } catch (err) {
      const error = ensureError(err)
      showNotification(
        "There was an issue with your registration",
        error.message,
        StatusEnum.ERROR,
      )
    }
  }

  return (
    <Layout
      shouldHaveAccess={status !== "authenticated"}
      loggedIn={status === "authenticated"}
      title={
        completedRegistrationStep == 3
          ? "Thank you for your registration."
          : "Registration"
      }
      isLoading={status === "loading"}
    >
      <Form
        onFinish={onFinishRegistration}
        form={registrationForm}
        initialValues={initialUserValues}
      >
        <ProgressBar
          setRegistrationStep={setRegistrationStep}
          registrationStep={registrationStep}
          completedRegistrationStep={completedRegistrationStep}
        />

        <RegistrationStepOne
          setRegistrationStep={setRegistrationStep}
          setCompletedRegistrationStep={setCompletedRegistrationStep}
          form={registrationForm}
          isVisible={registrationStep === 1}
        />

        <RegistrationStepTwo
          setRegistrationStep={setRegistrationStep}
          setCompletedRegistrationStep={setCompletedRegistrationStep}
          isVisible={registrationStep === 2}
        />

        <PaypalPayment
          form={registrationForm}
          setRegistrationStep={setRegistrationStep}
          setCompletedRegistrationStep={setCompletedRegistrationStep}
          isVisible={registrationStep === 3}
          onFinishRegistration={onFinishRegistration}
        />
      </Form>
    </Layout>
  )
}

export default Registration
