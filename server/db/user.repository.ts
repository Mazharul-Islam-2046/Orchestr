
export function getUserFromDb(email: string, pwHash: string) {
  // Implementation to get user from the database
  if (!email || !pwHash) {
    return null
  }
  const user = { email, pwHash }
  return user
}