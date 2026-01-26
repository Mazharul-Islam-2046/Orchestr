import { verifyPassword } from "@/utils/password"
import { UserRepository } from "../db/user.repository"

export async function authenticateUser(
  email: string,
  password: string
) {

  const user = await UserRepository.findByEmail(
    email
  )

  if (!user || !user.hashedPassword) return null
  
  const isValid = await verifyPassword(password, user.hashedPassword)

  if (!isValid) return null

  return user
}
