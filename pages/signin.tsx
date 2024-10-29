import { getCsrfToken, signIn } from "next-auth/react"
import { Layout } from "@components/Layout"
import { useRouter } from "next/router"
import { Button } from "@components/_general/button/Button"
import { Input } from "@components/_general/form/Input"
import { Form } from "@components/_general/form/Form"
import { useForm } from "@hooks/form.hooks"
import { useState } from "react"
import { Alert } from "@components/_general/Alert"
import { StatusEnum } from "@models/general"
import { CtxOrReq } from "next-auth/client/_utils"
import { FormValues } from "@components/_general/form/form.types"
import { Loader } from "@components/Loader"

export default function SignIn({ csrfToken }: { csrfToken?: string }) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm()

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      ...values,
    })
    setIsLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/profil")
    }
  }

  return (
    <Layout title="Login to Your Account">
      {isLoading ? (
        <Loader />
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            ...(csrfToken && { csrfToken }),
            email: "",
            password: "",
          }}
        >
          <Form.Item name="csrfToken">
            <Input type="hidden" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>

          <div className="flex flex-col items-center gap-3 mt-8">
            {error && (
              <Alert
                title="Error while logging in"
                message={error}
                type={StatusEnum.ERROR}
                showIcon
              />
            )}

            <Button
              type="primary"
              htmlType="submit"
              classNames="w-full h-[40px]"
            >
              Sign in
            </Button>

            <span>
              Don't have an account?{" "}
              <Button type="link" href="/registration">
                Register now.
              </Button>
            </span>
          </div>
        </Form>
      )}
    </Layout>
  )
}

export async function getServerSideProps(context: CtxOrReq) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
