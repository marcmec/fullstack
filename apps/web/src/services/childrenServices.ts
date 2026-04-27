import { Crianca, PaginatedResponse, ChildrenFilters, Summary } from '@fullstack/types'
import fetchAPI from '../lib/api'



export async function getChildren(token: string, filters: ChildrenFilters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
  )
  const query = params.toString() ? `?${params}` : ''
  return fetchAPI<PaginatedResponse<Crianca>>(`/children${query}`, { token })
}

export async function getChild(token: string, id: string) {
  return fetchAPI<{ data: Crianca }>(`/children/${id}`, { token })
}

export async function getSummary(token: string) {
  return fetchAPI<Summary>('/stats', { token })
}

export async function reviewChild(token: string, id: string) {
  return fetchAPI<{ data: Crianca }>(`/children/${id}/review`, {
    method: 'PATCH',
    token,
  })
}