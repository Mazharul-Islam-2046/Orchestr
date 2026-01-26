import bcrypt from "bcryptjs";



const saltround = 12;

export async function saltAndHashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltround);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
