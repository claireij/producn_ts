import "../styles/global.css"
import "@components/_general/button/button.css"
import "@components/_general/divider/divider.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
import "../i18n"

import React from "react"

import { SessionProvider } from "next-auth/react"
import { NotificationProvider } from "@components/_general/notification/NotificationProvider"
import { AppProps } from "next/app"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
