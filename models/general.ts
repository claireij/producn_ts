import { ChangeEvent, MouseEvent } from "react"

export enum StatusEnum {
  SUCCESS = "SUCCESS",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export type OnClickType = (event: MouseEvent<HTMLButtonElement>) => void

export type OnClickIconType = (event: MouseEvent<SVGElement>) => void

export type OnClickLabelType = (event: HTMLLabelElement) => void

export type OnChangeType = (event: ChangeEvent<HTMLInputElement>) => void

export type Error = {
  message: string
}
