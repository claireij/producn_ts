// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    image?: string
  }
  interface Session {
    user?: {
      id: string
      email: string
      image?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    image?: string
  }
}

export default NextAuth
