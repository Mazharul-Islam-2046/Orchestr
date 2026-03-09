import { Role } from "@prisma/client"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role?: Role | null
      /** Whether the user is using OAuth */
      isOAuth?: boolean
      /** The user's ID */
      id?: string
    } & DefaultSession["user"]
  }

  /** Extend the built-in User type */
  interface User {
    role?: Role | null
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's role. */
    role?: string | null
    /** Whether the user is using OAuth */
    isOAuth?: boolean
  }
}