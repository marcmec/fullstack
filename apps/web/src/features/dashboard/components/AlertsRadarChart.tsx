'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { Summary } from '@fullstack/types'
import { Card } from '@/components/ui/card'

export function AlertsRadarChart({ alerts }: { alerts: Summary['alertas'] }) {
  const data = [
    { categoria: 'Vacinas', valor: alerts.vacinas_atrasadas },
    { categoria: 'Frequência', valor: alerts.frequencia_baixa },
    { categoria: 'Benefício', valor: alerts.beneficio_suspenso },
    { categoria: 'Saúde', valor: alerts.sem_saude },
    { categoria: 'Educação', valor: alerts.sem_educacao },
    { categoria: 'Assistência', valor: alerts.sem_assistencia },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-bold text-primary mb-4">Perfil de alertas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="categoria" />
          <Radar
            name="Casos"
            dataKey="valor"
            stroke="oklch(0.27 0.09 260)"
            fill="oklch(0.27 0.09 260)"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}