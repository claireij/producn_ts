import { MouseEvent, useState } from "react"
import { UserService } from "@services/user.service"
import { Button } from "@components/_general/button/Button"
import { GenderEnum } from "@models/user"
import { Form } from "@components/_general/form/Form"
import { Input } from "@components/_general/form/Input"
import { Checkbox } from "@components/_general/form/Checkbox"
import { Select } from "@components/_general/form/Select"
import { Alert } from "@components/_general/Alert"
import { StatusEnum } from "@models/general"
import { FormContextType } from "@components/_general/form/form.types"

interface RegistrationStepOne {
  setRegistrationStep: (step: number) => void
  form: FormContextType
  isVisible: boolean
  setCompletedRegistrationStep: (step: number) => void
}

export const RegistrationStepOne = ({
  setRegistrationStep,
  form,
  isVisible,
  setCompletedRegistrationStep,
}: RegistrationStepOne) => {
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const handleNextClick = async (e: MouseEvent) => {
    e.preventDefault()

    const isFormValid = form.validateForm()

    const userEmail = form.getFieldValue({ name: "email" }) as string

    const user = await UserService.checkIfUserExists(userEmail)

    if (user) {
      setUserAlreadyExists(true)
    }

    if (isFormValid && !user) {
      setRegistrationStep(2)
      setCompletedRegistrationStep(1)
      setUserAlreadyExists(false)
    }
  }

  return (
    <div className={`flex flex-col items-center ${isVisible ? "" : "hidden"}`}>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          options={[
            { value: GenderEnum.FEMALE, label: "Mrs." },
            { value: GenderEnum.MALE, label: "Mr." },
            { value: GenderEnum.DIVERS, label: "Divers" },
          ]}
        ></Select>
      </Form.Item>

      <Form.Item
        name="firstname"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="lastname" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true },
          { type: "password" },
          { type: "password_confirmation" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label="Confirm Password"
        rules={[
          { required: true },
          { type: "password" },
          { type: "password_confirmation" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <p className="mb-5 mt-2">
        By registering, you agree to Producn's{" "}
        <Button type="link" href="/imprints">
          Terms of Service
        </Button>{" "}
        &{" "}
        <Button type="link" href="/privacy-policy">
          Privacy Policy.
        </Button>
      </p>

      <Form.Item name="retargeting">
        <Checkbox label="I hereby give Producn the permission to use retargeting." />
      </Form.Item>

      <Form.Item name="newsletter">
        <Checkbox label="Yes, I would like to subscribe to the Producn newsletter." />
      </Form.Item>

      <div className="mt-5 w-full flex flex-col items-center">
        {userAlreadyExists && (
          <Alert
            showIcon
            type={StatusEnum.ERROR}
            title="This user already exists"
            message={
              <p>
                Please click{" "}
                <Button type="link" href="/signin">
                  here
                </Button>{" "}
                to sign in.
              </p>
            }
          ></Alert>
        )}

        <Button type="primary" onClick={handleNextClick} classNames="mt-3">
          Next: Choose your subscription
        </Button>
      </div>
    </div>
  )
}
