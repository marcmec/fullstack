import { cookies } from 'next/headers'

const TOKEN_COOKIE = 'fullstack_token'

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_COOKIE)?.value
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE)
}