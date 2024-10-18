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

export default function SignIn({ csrfToken }: { csrfToken?: string }) {
  const router = useRouter()
  const [error, setError] = useState("")

  const form = useForm()

  const handleSubmit = async (values: FormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...values,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/profil")
    }
  }

  return (
    <Layout title="Signin to Producn">
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

        {error && (
          <Alert
            title="Error while logging in"
            message={error}
            type={StatusEnum.ERROR}
            showIcon
          />
        )}

        <div className="flex flex-col gap-2 mt-5">
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>

          <Button type="link" href="/registration">
            Don't have an account? Register now.
          </Button>
        </div>
      </Form>
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
