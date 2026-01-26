import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser } from "./server/services/auth.service";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session:{
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {


        try {

          let user = null;

          const { email, password } = await signInSchema.parseAsync(credentials)

          if (!email && !password) {
            throw new Error("Email and password are required");
          }
          user = await authenticateUser(
            credentials.email as string,
            credentials.password as string
          );
          if (!user) {
            throw new Error("Invalid email or password");
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null

        }
      }
    })
  ],
})