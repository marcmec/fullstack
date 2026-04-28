'use server'

import { reviewChild } from '@/services/childrenServices'
import { getAuthToken } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function reviewAction(id: string) {
  const token = await getAuthToken()
  await reviewChild(token!, id)
  revalidatePath(`/children/${id}`)
}