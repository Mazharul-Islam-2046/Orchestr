import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"
import { saltAndHashPassword } from "./utils/password"
import { getUserByEmail } from "./server/actions/auth.actions"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        try {
            let user = null


        const { email, password } = await signInSchema.parseAsync(credentials)
 
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(password as string)
 
        // logic to verify if the user exists
        user = getUserByEmail(email as string)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
        }catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
      }, 
    }),],
})