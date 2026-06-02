export const COOKIE_NAME = "ovah_admin"

/** Returns true if the supplied cookie value matches the ADMIN_TOKEN env var. */
export function verifyToken(token: string): boolean {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) return false
  return token === expected
}
