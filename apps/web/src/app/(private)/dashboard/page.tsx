// app/(private)/dashboard/page.tsx
import { getAlertsByBairro, getCriticalCases, getSummary } from '@/services/childrenServices'
import { getAuthToken } from '@/lib/auth'
import StatsChildren from '@/features/dashboard/components/StatsChildren'
import CriticalCasesSidebar from '@/features/dashboard/components/CriticalCasesSideBar'

import { AlertsRadarByBairro } from '@/features/dashboard/components/AlertsRadarByNeightbor'
export default async function DashboardPage() {
  const token = await getAuthToken()
  const [summary, criticalCases, alertsByBairro] = await Promise.all([
  getSummary(token!),
  getCriticalCases(token!),
  getAlertsByBairro(token!),
])
  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
  <div className="space-y-6">
    <h2>Visão Geral</h2>
    <StatsChildren Summary={summary} />
    <AlertsRadarByBairro data={alertsByBairro} />
 </div>

  <CriticalCasesSidebar cases={criticalCases} />
</div>
  )
}