import { Crianca } from './Crianca'

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface ChildrenFilters {
  bairro?: string
  alerta?: string
  revisado?: string
  page?: string
  limit?: string
}

export interface Summary {
  total: number
  revisados: number
  pendentes: number
  alertas: {
    sem_saude: number
    sem_educacao: number
    sem_assistencia: number
    vacinas_atrasadas: number
    frequencia_baixa: number
    beneficio_suspenso: number
  }
}