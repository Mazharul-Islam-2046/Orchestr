import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser } from "./server/services/auth.service";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        authorize: async (credentials) => {

          // Zod validation need to be added. I'll do it at office.


            if (!credentials?.email && !credentials?.password) {
                throw new Error("Email and password are required");
            }
            const user = await authenticateUser(
                credentials.email as string,
                credentials.password as string
            );
            if (!user) {
                throw new Error("Invalid email or password");
            }
            return user;
        }
    })
  ],
})