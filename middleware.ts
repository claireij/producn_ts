import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/users/get/:path*",
    "/api/users/confirm-email/:path*",
    "/api/users/update",
    "/api/paypal/:path*",
    "/api/questiontree/:path*",
  ],
}
