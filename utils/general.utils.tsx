import { StatusEnum } from "@models/general"
import { FaRegCheckCircle } from "react-icons/fa"
import { MdErrorOutline, MdWarningAmber } from "react-icons/md"
import { AiOutlineInfoCircle } from "react-icons/ai"
import axios from "axios"

export const getCurrentDateAndTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const date =
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds

  return date
}

export const randomString = () => {
  const length = 8
  let randStr = ""
  for (let i = 0; i < length; i++) {
    const ch = Math.floor(Math.random() * 10 + 1)
    randStr += ch
  }

  return randStr
}

export const hasWhitespaces = (value: string) => {
  const regex = new RegExp("s+")
  return regex.test(value)
}

export const isValidEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const isValidPassword = (password: string) => {
  const regExUpper = /[A-Z]/
  const regExLower = /[a-z]/
  const regExNumber = /[0-9]/

  const errors = []

  if (!regExUpper.test(password)) {
    errors.push("Your password needs to contain at least one uppercase letter.")
  }
  if (!regExLower.test(password)) {
    errors.push("Your password needs to contain at least one lowercase letter.")
  }
  if (!regExNumber.test(password)) {
    errors.push("Your password needs to contain at least one number.")
  }

  return errors
}

export const getStatusIcon = (type: StatusEnum) => {
  const iconClassName = "w-8 shrink-0"

  switch (type) {
    case StatusEnum.SUCCESS:
      return <FaRegCheckCircle size={40} className={iconClassName + " text-green"} />
    case StatusEnum.WARNING:
      return <MdWarningAmber size={40} className={iconClassName + " text-orange"} />
    case StatusEnum.ERROR:
      return <MdErrorOutline size={40} className={iconClassName + " text-red"} />
    default:
      return <AiOutlineInfoCircle size={40} className={iconClassName + " text-blue"} />
      break
  }
}

export const getStatusColor = (type: StatusEnum, element: "bg" | "border") => {
  switch (type) {
    case StatusEnum.SUCCESS:
      return `${element}-green`
    case StatusEnum.WARNING:
      return `${element}-orange`
    case StatusEnum.ERROR:
      return `${element}-red`
    default:
      return `${element}-blue`
      break
  }
}

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error("Server Error:", error.response.data)
      console.error("Status Code:", error.response.status)
      return {
        message: "An error occurred while fetching data from the server.",
        status: error.response.status,
        data: error.response.data,
      }
    } else if (error.request) {
      console.error("Network Error: No response from server:", error.request)
      return {
        message:
          "Network error: Unable to connect to the server. Please try again later.",
        status: null,
      }
    } else {
      console.error("Request Setup Error:", error.message)
      return {
        message:
          "Request error: Something went wrong while setting up the request.",
        status: null,
      }
    }
  } else {
    console.log(error)
  }
}

export const getQueryString = (queryString?: string | Array<string>) => {
  return Array.isArray(queryString) ? queryString[0] || "" : queryString || ""
}

export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value

  let stringified = "[Unable to stringify the thrown value]"
  try {
    stringified = JSON.stringify(value)
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  )
  return error
}

export const ensureArray = (input: string | string[]): string[] => {
  return Array.isArray(input) ? input : [input]
}
