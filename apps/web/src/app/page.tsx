import { redirect } from 'next/navigation'
import { getAuthToken } from '@/lib/auth'

export default async function RootPage() {
  const token = await getAuthToken()
  
  if (token) {
    redirect('/dashboard')
  }
  
  redirect('/login')
}

//possível landing page futura, mas por enquanto redireciona direto para login ou dashboard dependendo do token