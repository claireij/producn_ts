import { Header } from "@components/header/Header"
import { Footer } from "@components/Footer"
import { Loader } from "@components/Loader"
import { AccessDenied } from "@components/AccessDenied"
import { Alert } from "./_general/Alert"
import { StatusEnum } from "@models/general"
import { ReactNode } from "react"

interface LayoutInterface {
  children?: ReactNode
  title: string
  showTitle?: boolean
  hasError?: boolean
  isLoading?: boolean
  shouldHaveAccess?: boolean
  loggedIn?: boolean
  centered?: boolean
  customAccessDeniedPage?: ReactNode
}

export const Layout = ({
  children,
  title,
  showTitle = true,
  isLoading,
  hasError,
  shouldHaveAccess = true,
  loggedIn = false,
  centered = true,
  customAccessDeniedPage
}: LayoutInterface) => {
  let body
  if (isLoading) {
    body = <Loader />
  } else if (!shouldHaveAccess) {
    body = customAccessDeniedPage ? customAccessDeniedPage : <AccessDenied loggedIn={loggedIn} />
  } else if (hasError) {
    body = (
      <Alert
        showIcon
        type={StatusEnum.ERROR}
        title="Error"
        message="There has been an error loading this page."
      />
    )
  } else {
    body = children
  }

  return (
    <div className="bg-grey flex flex-col min-h-screen justify-between">
      <Header title={title + " - Producn"} />
      <div className={`mx-10 bg-white rounded p-10 shadow min-h-[600px] ${centered ? "flex flex-col items-center" : ""}`}>
        {showTitle && shouldHaveAccess && <h1>{title}</h1>}
        <div className="w-full">{body}</div>
      </div>
      <Footer />
    </div>
  )
}
