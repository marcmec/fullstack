'use server'

import { redirect } from 'next/navigation'
import { login } from '@/services/authServices'
import { clearAuthCookie, setAuthCookie } from '@/lib/auth'
import { loginSchema } from './schema'
import { LoginActionState } from './types'
export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  

  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha os campos corretamente',
    }
  }

  const { email, password } = validatedFields.data

  try {
    const { token } = await login(email, password)
    await setAuthCookie(token)
  } catch {
    return { errors: { email: ['Credenciais inválidas'] }, message: 'Credenciais inválidas' }
  }

  redirect('/dashboard')
}

export async function logoutAction() {
  await clearAuthCookie()
  redirect('/login')
}