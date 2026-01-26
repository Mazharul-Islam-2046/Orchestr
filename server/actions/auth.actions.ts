"use server"

import { prisma } from "@/lib/prisma"

export async function getUserByEmail(email: string) {
  if (!email) return null

  return prisma.user.findUnique({
    where: { email },
  })
}
