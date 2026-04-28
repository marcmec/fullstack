import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export default function DashboardLoading() {
  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        
        {/* StatsCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="p-4 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div>

        {/* Radar */}
        <Card className="p-4 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-[350px] w-full" />
        </Card>
      </div>

      {/* Sidebar de casos críticos */}
      <Card className="p-4 space-y-3">
        <Skeleton className="h-5 w-28" />
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Skeleton className="w-9 h-9 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-6" />
          </div>
        ))}
      </Card>
    </div>
  )
}