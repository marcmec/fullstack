import { Crianca, PaginatedResponse, ChildrenFilters, Summary } from '@fullstack/types'
import fetchAPI from '../lib/api'
import { countAlerts } from '@/features/children/helpers'
import { BairroAlerts } from '@/features/dashboard/types'



export async function getChildren(token: string, filters: ChildrenFilters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== undefined) as [string, string][]
  )
  const query = params.toString() ? `?${params}` : ''
  return fetchAPI<PaginatedResponse<Crianca>>(`/children${query}`, { token })
}

export async function getChild(token: string, id: string): Promise<{ data: Crianca }> {
  const data = await fetchAPI<{ data: Crianca }>(`/children/${id}`, { token })
  return data;
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


//modificar isso - se eu tivesse mais tempo

export async function getCriticalCases(token: string, limit = 7) {
  const { data } = await getChildren(token, { limit: '100' })
  return data
    .filter(c => countAlerts(c) > 0)
    .sort((a, b) => countAlerts(b) - countAlerts(a))
    .slice(0, limit)
}

export async function getBairros(token: string): Promise<string[]> {
  const { data } = await getChildren(token, { limit: '100' })
  return [...new Set(data.map(c => c.bairro))].sort()
}

// se tivesse mais tempo...
export async function getAlertsByBairro(token: string) {
  const { data } = await getChildren(token, { limit: '100' })

  const grouped: Record<string, Record<string, number>> = {}

  data.forEach(c => {
    if (!grouped[c.bairro]) {
      grouped[c.bairro] = {
        vacinas_atrasadas: 0,
        frequencia_baixa: 0,
        beneficio_suspenso: 0,
        sem_saude: 0,
        sem_educacao: 0,
        sem_assistencia: 0,
      }
    }

    if (!c.saude) grouped[c.bairro].sem_saude++
    if (!c.educacao) grouped[c.bairro].sem_educacao++
    if (!c.assistencia_social) grouped[c.bairro].sem_assistencia++

    if (c.saude?.alertas?.includes('vacinas_atrasadas')) {
      grouped[c.bairro].vacinas_atrasadas++
    }
    if (c.educacao?.alertas?.includes('frequencia_baixa')) {
      grouped[c.bairro].frequencia_baixa++
    }
    if (c.assistencia_social?.alertas?.includes('beneficio_suspenso')) {
      grouped[c.bairro].beneficio_suspenso++
    }
  })

  return Object.entries(grouped).map(([bairro, alertas]) => ({
    bairro,
    ...alertas,
  })) as BairroAlerts[]
}
