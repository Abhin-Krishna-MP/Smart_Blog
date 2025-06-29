
export function decodeToken(token) {
  if (!token) return null
  try {
    const base64 = token.split('.')[1]
    const decoded = JSON.parse(atob(base64))
    return decoded
  } catch (e) {
    console.error('Invalid token:', e)
    return null
  }
}
