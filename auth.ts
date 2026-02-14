import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { AccountRepository } from "./server/db/account.repository";
import { UserRepository } from "./server/db/user.repository";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await UserRepository.getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await AccountRepository.getAccountById(existingUser.id);



      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            isOAuth: token.isOAuth,
            role: token.role
          },
        } 
    },

    async signIn({ user, account }) {
      if(account?.provider !== "credentials") return true;
      if (!user.id) return false;

      // const existingUser = await UserRepository.getUserById(user.id);

      // if(!existingUser?.emailVerified) return false;

      return true
    },

  }
  
});
