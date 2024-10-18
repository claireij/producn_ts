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
import { createWriteStream } from "fs"
import { format } from "util"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  // Improve console logs for Cpanel
  const log_file = createWriteStream(__dirname + "/debug.log", { flags: "w" })
  const log_stdout = process.stdout

  console.log = (d, e, f, g) => {
    log_file.write(
      format("LOG: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n",
    )
    log_stdout.write(
      format("LOG: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n",
    )
  }

  console.error = (d, e, f, g) => {
    log_file.write(
      format("ERROR: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n",
    )
    log_stdout.write(
      format("ERROR: ", d ? d : "", e ? e : "", f ? f : "", g ? g : "") + "\n",
    )
  }

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
