'use client'

import { useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { BairroAlerts } from '../types'

const categorias = [
  { key: 'vacinas_atrasadas', label: 'Vacinas' },
  { key: 'frequencia_baixa', label: 'Frequência' },
  { key: 'beneficio_suspenso', label: 'Benefício' },
  { key: 'sem_saude', label: 'S. Saúde' },
  { key: 'sem_educacao', label: 'S. Educação' },
  { key: 'sem_assistencia', label: 'S. Assistência' },
] as const

const cores = [
  'oklch(0.27 0.09 260)',
  'oklch(0.62 0.18 35)',
  'oklch(0.6 0.13 240)',
  'oklch(0.7 0.13 145)',
  'oklch(0.75 0.08 80)',
]

export function AlertsRadarByBairro({ data }: { data: BairroAlerts[] }) {
  const topBairros = [...data]
    .map((b) => ({
      ...b,
      total:
        b.vacinas_atrasadas +
        b.frequencia_baixa +
        b.beneficio_suspenso +
        b.sem_saude +
        b.sem_educacao +
        b.sem_assistencia,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  const [bairrosVisiveis, setBairrosVisiveis] = useState<Set<string>>(
    new Set(topBairros.map((b) => b.bairro))
  )

  function toggleBairro(bairro: string) {
    setBairrosVisiveis((prev) => {
      const next = new Set(prev)
      if (next.has(bairro) && next.size === 1) return prev
      if (next.has(bairro)) next.delete(bairro)
      else next.add(bairro)
      return next
    })
  }

  const chartData = categorias.map((cat) => {
    const row: Record<string, string | number> = { categoria: cat.label }
    topBairros.forEach((b) => {
      row[b.bairro] = b[cat.key as keyof typeof b] as number
    })
    return row
  })

  return (
    <Card className="p-4 w-full">
      <h3 className="font-bold text-primary mb-1">Perfil por bairro</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Os 5 bairros com mais alertas — clique para mostrar/ocultar
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {topBairros.map((bairro, i) => {
          const ativo = bairrosVisiveis.has(bairro.bairro)
          return (
            <button
              key={bairro.bairro}
              type="button"
              onClick={() => toggleBairro(bairro.bairro)}
              className="flex items-center gap-2 px-3 py-1 text-xs rounded-full border transition-colors"
              style={{
                borderColor: ativo ? cores[i] : 'var(--border)',
                backgroundColor: ativo
                  ? `color-mix(in oklch, ${cores[i]} 15%, transparent)`
                  : 'transparent',
                color: ativo ? cores[i] : 'var(--muted-foreground)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: ativo ? cores[i] : 'var(--muted-foreground)' }}
              />
              {bairro.bairro}
            </button>
          )
        })}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="categoria" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />

          {topBairros.map((bairro, i) => {
            if (!bairrosVisiveis.has(bairro.bairro)) return null
            return (
              <Radar
                key={bairro.bairro}
                name={bairro.bairro}
                dataKey={bairro.bairro}
                stroke={cores[i]}
                fill={cores[i]}
                fillOpacity={0.15}
              />
            )
          })}
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}