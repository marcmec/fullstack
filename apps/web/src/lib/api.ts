
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default async function fetchAPI<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...rest } = options

  const headers: HeadersInit = {
    ...(rest.body ? { 'Content-Type': 'application/json' } : {}),
    ...(rest.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
