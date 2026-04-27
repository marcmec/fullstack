export interface StatCardProps {
  title: string
  value: number | string
  description?: string
  alert?: boolean
}

export interface BairroAlerts {
  bairro: string
  vacinas_atrasadas: number
  frequencia_baixa: number
  beneficio_suspenso: number
  sem_saude: number
  sem_educacao: number
  sem_assistencia: number
}