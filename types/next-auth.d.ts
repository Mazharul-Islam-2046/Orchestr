import { Role } from "@prisma/client"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      activeRestaurantId?: string | null
      role?: Role | null
      isOAuth?: boolean
      id?: string
    } & DefaultSession["user"]
  }

  /** Extend the built-in User type */
  interface User {
    role?: Role | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null
    isOAuth?: boolean
    activeRestaurantId?: string | null
  }
}