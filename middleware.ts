import { NextResponse } from "next/server"
import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextApiRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/paypal/:path*",
    "/api/questiontree/:path*",
  ],
}
