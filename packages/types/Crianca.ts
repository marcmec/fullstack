export interface Saude {
  ultima_consulta: string
  vacinas_em_dia: boolean
  alertas: string[]
}

export interface Educacao {
  escola: string | null
  frequencia_percent: number | null
  alertas: string[]
}

export interface AssistenciaSocial {
  cad_unico: boolean
  beneficio_ativo: boolean
  alertas: string[]
}

export interface Crianca {
  id: string
  nome: string
  data_nascimento: string
  bairro: string
  responsavel: string
  saude: Saude | null
  educacao: Educacao | null
  assistencia_social: AssistenciaSocial | null
  revisado: boolean
  revisado_por: string | null
  revisado_em: string | null
}