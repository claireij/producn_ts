import { Layout } from "@components/Layout"
import { useState } from "react"
import { Checkbox } from "@components/_general/form/Checkbox"
import { User } from "@models/user"
import { Input } from "@components/_general/form/Input"
import { Button } from "@components/_general/button/Button"
import { UserService } from "@services/user.service"
import { PaypalService } from "@services/paypal.service"
import { Avatar } from "@components/_general/Avatar"
import { Divider } from "@components/_general/divider/Divider"
import { Form } from "@components/_general/form/Form"
import { useForm } from "@hooks/form.hooks"
import { EditField } from "@components/profil/EditField"
import moment from "moment"
import { dateFormat } from "../consts"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { showNotification } from "@services/notification.service"
import { StatusEnum } from "@models/general"
import { FaCheck } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import { ensureError } from "@utils/general.utils"

export default function Profil() {
  const [edit, setEdit] = useState({
    name: false,
    password: false,
    newsletterAndRetargeting: false,
  })

  const form = useForm()

  const { data: session, status } = useSession()

  const {
    data: user,
    isLoading: isLoadingUser,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserService.getUser(session?.user?.email || ""),
    enabled: status === "authenticated" && !!session?.user?.email,
  })

  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => PaypalService.getSubscription(user.id),
    enabled: !!user,
  })

  const achievements = [
    {
      title: "Problems solved",
      className: "problems-solved",
      number: user?.problems_solved,
    },
    {
      title: "Articles read",
      className: "articles-read",
      number: user?.articles_read,
    },
  ]

  const handleSubscriptionCancellation = async () => {
    try {
      await PaypalService.pauseSubscription(user?.id)

      showNotification(
        "Subscription paused.",
        "We have successfully paused your subscription",
      )
    } catch (err) {
      const error = ensureError(err)
      showNotification(
        "Couldn't cancel your subscription",
        error.message,
        StatusEnum.ERROR,
      )
    }
  }

  const handleUserUpdate = async (formValues: Partial<User>) => {
    try {
      await UserService.updateUser({
        ...formValues,
        email: user?.email,
      })

      showNotification(
        "User updated",
        "The user data was successfully updated.",
      )
      setEdit({
        name: false,
        password: false,
        newsletterAndRetargeting: false,
      })
      refetch()
    } catch (err) {
      const error = ensureError(err)
      showNotification("User update failed", error.message, StatusEnum.ERROR)
    }
  }

  const date = moment(user?.createdAt).format(dateFormat)

  return (
    <Layout
      title="Profil"
      isLoading={status === "loading" || isLoadingUser || isLoadingSubscription}
      hasError={isError || !user}
      shouldHaveAccess={!!session}
    >
      <section>
        <div className="mb-5">
          <div className="flex gap-3 items-center">
            <Avatar src={user?.picture} />
            <div>
              <h2>
                {user?.firstname} {user?.lastname}
              </h2>
              <p>Joined {date}</p>
            </div>
          </div>
        </div>

        <Divider text="Achievements"></Divider>

        {achievements.map((achievement) => (
          <p key={achievement.className} className="profile__field__label">
            {achievement?.title}:{" "}
            {achievement?.number ? achievement?.number : "0"}
          </p>
        ))}
      </section>

      <section className="mb-5">
        <Divider text="Profile Info"></Divider>
        <Form form={form} onFinish={handleUserUpdate} initialValues={user}>
          <EditField
            title="Name"
            isOpen={edit.name}
            value={`${user?.firstname} ${user?.lastname}`}
            onClick={() => setEdit({ ...edit, name: !edit.name })}
          >
            <Form.Item
              name="firstname"
              label="Firstname"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Lastname"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </EditField>

          <div className="flex items-center gap-2 mb-3">
            <h4 className="w-[100px] font-bold">Email</h4>
            <p>{user?.email}</p>
          </div>

          <EditField
            title="Password"
            isOpen={edit.password}
            value="Change password"
            onClick={() => setEdit({ ...edit, password: !edit.password })}
          >
            <Form.Item
              name="old_password"
              label="Enter old password"
              rules={[{ required: true }, { type: "password" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="password"
              label="Choose new password"
              rules={[
                { required: true },
                { type: "password_confirmation" },
                { type: "password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              label="Confirm new password"
              rules={[
                { required: true },
                { type: "password_confirmation" },
                { type: "password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </EditField>

          <EditField
            title="Newsletter & Retargeting"
            isOpen={edit.newsletterAndRetargeting}
            value={
              <div>
                <div className="flex items-center gap-2">
                  Newsletter: {user?.newsletter ? <FaCheck /> : <GrClose />}
                </div>
                <div className="flex items-center gap-2">
                  Retargeting: {user?.retargeting ? <FaCheck /> : <GrClose />}
                </div>
              </div>
            }
            onClick={() =>
              setEdit({
                ...edit,
                newsletterAndRetargeting: !edit.newsletterAndRetargeting,
              })
            }
          >
            <Form.Item name="newsletter">
              <Checkbox label="Newsletter subscription" />
            </Form.Item>

            <Form.Item name="retargeting">
              <Checkbox label="Retargeting" />
            </Form.Item>
          </EditField>

          <Divider text="Subscription"></Divider>
          <p className="profile__field__paragraph">{user?.subscription}</p>

          <div className="profile__field__edit">
            {subscription?.subscription_id ? (
              <>
                <p className="mb-2">{subscription?.subscription_id}</p>
                <div className="flex gap-2">
                  <Button href="/subscriptions">Change subscription</Button>
                  <Button
                    danger
                    type="primary"
                    onClick={handleSubscriptionCancellation}
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p>
                  You don't have a subscription. You can choose one{" "}
                  <Button type="link" href="/subscriptions">
                    here
                  </Button>
                  .
                </p>
              </>
            )}
          </div>
        </Form>
      </section>
    </Layout>
  )
}
