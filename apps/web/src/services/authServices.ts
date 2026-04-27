import fetchAPI from "../lib/api";

export async function login(email: string, password: string) {
  return fetchAPI<{ token: string }>('/auth/token', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}