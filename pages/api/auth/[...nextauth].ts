import NextAuth, { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/check-user-credentials`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        )
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Authentication failed');
      }

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id,
        email: token.email,
        image: token.image,
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
